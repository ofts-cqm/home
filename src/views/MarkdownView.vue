<script setup lang="ts">
import { computed } from "vue";
import MarkdownRenderer from "@/components/MarkdownRenderer.vue";
import { getContentDocument } from "@/content/registry";

const props = defineProps<{
  documentId: string;
}>();

const document = computed(() => {
  const match = getContentDocument(props.documentId);
  if (!match) throw new Error(`Unknown Markdown document: ${props.documentId}`);
  return match;
});
</script>

<template>
  <MarkdownRenderer class="editor-surface" :document="document" />
</template>

<style scoped>
.editor-surface {
  background-color: #171717;
}
</style>
