<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import type { PortfolioShell } from "../terminal/portfolioShell";

interface TerminalEntry {
  directory: string;
  id: number;
  command: string;
  submittedAt: string;
  stderr: string;
  stdout: string;
}

const props = defineProps<{
  open: boolean;
}>();

const FASTFETCH_GREETING = String.raw`      /\          guest@archlinux
     /  \         os      Arch Linux x86_64
    /    \        kernel  Linux 7.1.9-zen1-2-zen
   /      \       host    Super Cool Computer
  /   ,,   \      pkgs    18 (flatpak), 1288 (pacman)
 /   |  |   \     uptime  67h 76m
/_-''    ''-_\    memory  5.35 GiB / 2147482647 GiB (0%)`;

const DEFAULT_TERMINAL_DIRECTORY = "/assets/content";

const entries = ref<TerminalEntry[]>([]);
const draft = ref("");
const input = ref<HTMLInputElement>();
const viewport = ref<HTMLElement>();
const currentTime = ref(formatLocalTime());
const currentDirectory = ref(DEFAULT_TERMINAL_DIRECTORY);

let nextEntryId = 0;
let clockTimer: number | undefined;
let shell: PortfolioShell | undefined;
let shellPromise: Promise<PortfolioShell> | undefined;
const commandHistory: string[] = [];
let historyIndex = -1;
let draftBeforeHistory = "";

function formatLocalTime(date = new Date()): string {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function formatPrompt(
  time: string,
  directory = currentDirectory.value,
): string {
  return `guest > ...${directory} > ${time} > `;
}

function scrollToLatestEntry(): void {
  if (viewport.value) {
    viewport.value.scrollTop = viewport.value.scrollHeight;
  }
}

async function submitCommand(): Promise<void> {
  const command = draft.value;
  const submittedAt = formatLocalTime();
  const submittedDirectory = currentDirectory.value;

  if (!command.trim()) {
    draft.value = "";
    return;
  }

  commandHistory.push(command);
  historyIndex = -1;
  draftBeforeHistory = "";

  if (command.trim() === "clear") {
    entries.value = [];
    draft.value = "";
    return;
  }

  let stdout = "";
  let stderr = "";

  try {
    const result = await getShell().then((portfolioShell) =>
      portfolioShell.execute(command),
    );

    currentDirectory.value = result.directory;
    stdout = result.stdout;
    stderr = result.stderr;
  } catch (error) {
    stderr = `terminal: ${error instanceof Error ? error.message : "unable to execute command"}\n`;
  }

  entries.value.push({
    directory: submittedDirectory,
    id: nextEntryId++,
    command,
    submittedAt,
    stderr,
    stdout,
  });

  draft.value = "";
  await nextTick();
  scrollToLatestEntry();
  input.value?.focus({ preventScroll: true });
}

function navigateHistory(event: KeyboardEvent, direction: -1 | 1): void {
  if (event.isComposing || commandHistory.length === 0) {
    return;
  }

  if (historyIndex === -1) {
    if (direction === 1) {
      return;
    }

    draftBeforeHistory = draft.value;
    historyIndex = commandHistory.length - 1;
  } else {
    const nextIndex = historyIndex + direction;

    if (nextIndex >= commandHistory.length) {
      historyIndex = -1;
      draft.value = draftBeforeHistory;
      draftBeforeHistory = "";
      event.preventDefault();
      return;
    }

    historyIndex = Math.max(0, nextIndex);
  }

  draft.value = commandHistory[historyIndex] ?? "";
  event.preventDefault();
}

function resetHistoryNavigation(): void {
  if (historyIndex !== -1) {
    historyIndex = -1;
    draftBeforeHistory = "";
  }
}

function getShell(): Promise<PortfolioShell> {
  if (shell) {
    return Promise.resolve(shell);
  }

  shellPromise ??= import("../terminal/portfolioShell")
    .then((module) => {
      return module.createPortfolioShell();
    })
    .then((portfolioShell) => {
      shell = portfolioShell;
      return portfolioShell;
    });

  return shellPromise;
}

function focusInput(event: MouseEvent): void {
  const selection = window.getSelection();

  if (selection && !selection.isCollapsed) {
    return;
  }

  const target = event.target as HTMLElement;
  if (target.closest("input, button, a")) {
    return;
  }

  input.value?.focus({ preventScroll: true });
}

watch(
  () => props.open,
  async (isOpen) => {
    if (!isOpen) {
      input.value?.blur();
      return;
    }

    await nextTick();
    scrollToLatestEntry();

    void getShell();

    if (!window.matchMedia("(max-width: 800px)").matches) {
      input.value?.focus({ preventScroll: true });
    }
  },
);

onMounted(() => {
  clockTimer = window.setInterval(() => {
    currentTime.value = formatLocalTime();
  }, 1000);
});

onBeforeUnmount(() => {
  if (clockTimer !== undefined) {
    window.clearInterval(clockTimer);
  }
});
</script>

<template>
  <section
    id="integrated-terminal"
    class="terminal-panel editorLayout"
    aria-label="Terminal"
    :aria-hidden="!open"
    :inert="!open"
  >
    <div class="terminal-title">Terminal</div>

    <div ref="viewport" class="terminal-viewport" @click="focusInput">
      <pre class="fastfetch" aria-label="System information">{{
        FASTFETCH_GREETING
      }}</pre>

      <div class="terminal-history" role="log" aria-live="polite">
        <div v-for="entry in entries" :key="entry.id" class="history-entry">
          <div class="terminal-line">
            <span class="prompt">{{
              formatPrompt(entry.submittedAt, entry.directory)
            }}</span>
            <span class="committed-command">{{ entry.command }}</span>
          </div>
          <pre v-if="entry.stdout.length > 0" class="command-output">{{
            entry.stdout
          }}</pre>
          <pre v-if="entry.stderr.length > 0" class="command-error">{{
            entry.stderr
          }}</pre>
        </div>
      </div>

      <form class="terminal-line active-line" @submit.prevent="submitCommand">
        <label class="visually-hidden" for="terminal-command"
          >Terminal command</label
        >
        <span class="prompt" aria-hidden="true">{{
          formatPrompt(currentTime)
        }}</span>
        <input
          id="terminal-command"
          ref="input"
          v-model="draft"
          class="command-input"
          type="text"
          autocomplete="off"
          autocapitalize="off"
          autocorrect="off"
          enterkeyhint="send"
          spellcheck="false"
          @input="resetHistoryNavigation"
          @keydown.arrow-down="navigateHistory($event, 1)"
          @keydown.enter="
            ($event as KeyboardEvent).isComposing && $event.preventDefault()
          "
          @keydown.arrow-up="navigateHistory($event, -1)"
        />
      </form>
    </div>
  </section>
</template>

<style scoped>
.terminal-panel {
  display: flex;
  flex-direction: column;
  min-height: 0;
  width: 100%;
  background-color: var(--color-background);
  border-color: #2b2b2b;
  border-style: solid;
  border-width: 1px 0 0;
  color: #c5c5c5;
  overflow: hidden;
}

.terminal-title {
  display: flex;
  height: 2rem;
  flex: 0 0 2rem;
  align-items: center;
  padding: 0 1rem;
  border-color: #2b2b2b;
  border-style: solid;
  border-width: 0 0 1px;
  color: var(--color-text);
  font-size: 0.9rem;
}

.terminal-viewport {
  width: 100%;
  min-height: 0;
  flex: 1 1 auto;
  padding: 0.5rem 1rem 0.65rem;
  overflow: auto;
  cursor: text;
  font-family:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    monospace;
  font-size: 0.95rem;
  line-height: 1.3;
}

.fastfetch {
  width: max-content;
  min-width: max-content;
  margin-bottom: 0.65em;
  color: #ffffff;
  line-height: inherit;
  white-space: pre;
}

.terminal-history {
  width: 100%;
}

.history-entry {
  width: 100%;
}

.terminal-line {
  display: flex;
  width: 100%;
  align-items: baseline;
}

.prompt {
  flex: 0 0 auto;
  color: #ffffff;
  white-space: pre;
}

.committed-command,
.command-output {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.committed-command {
  min-width: 0;
}

.command-output {
  width: 100%;
  color: #c5c5c5;
  font: inherit;
}

.command-error {
  width: 100%;
  margin: 0;
  color: #f48771;
  font: inherit;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.active-line {
  min-width: max-content;
  flex-wrap: nowrap;
}

.command-input {
  min-width: 8ch;
  flex: 1 0 8ch;
  padding: 0;
  color: #ffffff;
  background: transparent;
  border: 0;
  border-radius: 0;
  caret-color: #ffffff;
  font: inherit;
  line-height: inherit;
  outline: none;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 800px) {
  .terminal-title {
    padding: 0 0.75rem;
  }

  .terminal-viewport {
    padding: 0.5rem 0.75rem 0.65rem;
    font-size: 0.85rem;
  }
}
</style>
