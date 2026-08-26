<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, watch } from "vue";
import type { ContentDocument } from "@/content/types";
import { getGridColumnCount, shouldStackColumns } from "@/markdown/layout";
import { renderMarkdown } from "@/markdown/renderMarkdown";

const props = defineProps<{
  document: ContentDocument;
}>();

const rendering = computed(() => {
  try {
    return { html: renderMarkdown(props.document), error: null };
  } catch (error) {
    return {
      html: "",
      error:
        error instanceof Error
          ? error.message
          : "The Markdown document could not be rendered.",
    };
  }
});

let root: HTMLElement | null = null;
let resizeObserver: ResizeObserver | null = null;

function numericGap(element: HTMLElement): number {
  const styles = window.getComputedStyle(element);
  const gap = Number.parseFloat(styles.columnGap || styles.gap);
  return Number.isFinite(gap) ? gap : 0;
}

function resizeColumns(element: HTMLElement, width: number): void {
  const leftFlex = Number(element.dataset.flexLeft);
  const rightFlex = Number(element.dataset.flexRight);
  const gap = numericGap(element);

  element.style.setProperty("--md-left-flex", String(leftFlex));
  element.style.setProperty("--md-right-flex", String(rightFlex));
  element.classList.toggle(
    "md-columns-stacked",
    shouldStackColumns(width),
  );
}

function resizeGrid(element: HTMLElement, width: number): void {
  const preferredColumns = Number(element.dataset.columns);
  const gap = numericGap(element);
  const columns = getGridColumnCount(width, gap, preferredColumns);
  element.style.setProperty("--md-grid-columns", String(columns));
}

function observeLayouts(): void {
  void nextTick(() => {
    resizeObserver?.disconnect();
    if (!root || !resizeObserver || rendering.value.error) return;

    root
      .querySelectorAll<HTMLElement>(".md-columns, .md-grid")
      .forEach((element) => {
        resizeObserver?.observe(element);
      });
  });
}

function setRoot(element: unknown): void {
  root = element instanceof HTMLElement ? element : null;
}

function flipCard(card: HTMLElement, force?: boolean): void {
  const flipped = force ?? !card.classList.contains("is-flipped");
  card.classList.toggle("is-flipped", flipped);
  card.setAttribute("aria-pressed", String(flipped));
}

function findCard(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null;
  const card = target.closest<HTMLElement>(".md-flip-card");
  return card && root?.contains(card) ? card : null;
}

function handleClick(event: MouseEvent): void {
  const card = findCard(event.target);
  if (!card) return;

  const target = event.target as Element;
  if (
    card.classList.contains("is-flipped") &&
    target.closest("a, button, input, select, textarea")
  ) {
    return;
  }

  flipCard(card);
}

function handleKeydown(event: KeyboardEvent): void {
  const card = findCard(event.target);
  if (!card) return;

  if (event.key === "Escape") {
    flipCard(card, false);
    card.focus();
    return;
  }

  if (event.target === card && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    flipCard(card);
  }
}

onMounted(() => {
  resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const element = entry.target as HTMLElement;
      if (element.classList.contains("md-columns")) {
        resizeColumns(element, entry.contentRect.width);
      } else {
        resizeGrid(element, entry.contentRect.width);
      }
    }
  });
  observeLayouts();
});

watch(() => props.document.id, observeLayouts);

onBeforeUnmount(() => resizeObserver?.disconnect());
</script>

<template>
  <article
    :ref="setRoot"
    class="markdown-document"
    :data-document-id="document.id"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <div v-if="rendering.error" class="markdown-error" role="alert">
      <h1>Unable to render {{ document.label }}</h1>
      <pre>{{ rendering.error }}</pre>
    </div>
    <div v-else class="markdown-body" v-html="rendering.html"></div>
  </article>
</template>
