<script setup lang="ts">
import { RouterLink } from 'vue-router'
import IconMarkdown from './icons/IconMarkdown.vue';
import IconRootFolder from './icons/IconRootFolder.vue';
import { useUIStore } from './../stores/control'

const control = useUIStore()
</script>

<template>
  <div class="editorLayout">
    <div class="explorer-title pad">
      Explorer
      <IconRootFolder/>
    </div>
    <div class="pad" style="white-space: nowrap;">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
      </svg>
      OFTS-CQM
    </div>
    <RouterLink to="/" class="file">
      <IconMarkdown/>
      README.md
    </RouterLink>

    <RouterLink to="/about" class="file">
      <IconMarkdown/>
      About.md
    </RouterLink>
  </div>
</template>

<style scoped>

.pad{
  padding-left: 1.2rem;
  padding-right: 1.2rem;
  overflow: hidden;
}

.file {
  display: flex;
  flex-direction: row;
  place-items: center;
  background-color: transparent;
  color: var(--text-color);
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 2rem;
  width: 100%;
  overflow: hidden;
}

.file.router-link-active {
  background-color: var(--color-background-soft);
}

.explorer-title {
  display: flex;
  place-items: center;
  justify-content: space-between;
  width: 100%;
}

</style>
