<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import IconMarkdown from './icons/IconMarkdown.vue';

const route = useRoute();
</script>

<template>
    <div class="editorLayout">
        <div class="file-tag">
            <div class="open-file">
                <IconMarkdown/>
                {{ route.meta.label }}
            </div>
            <div class="tag-space"></div>
            </div>
        <RouterView class="file-view"/>
    </div>
</template>

<style scoped>
.file-tag {
  display: flex;
  flex-direction: row;
  flex-grow: 0;
  flex-shrink: 0;
  height: 5vh;
}

.open-file {
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: row;
  flex-grow: 0;
  border-style: solid;
  border-width: 2px 0 0 0;
  border-color: #3376CE;
  font-style: italic;
}

.tag-space {
  flex-grow: 114514;
  border-style: solid;
  border-width: 0 0 1px 1px;
  border-color: #2B2B2B;
}

.file-view {
  overflow: scroll;
  flex-grow: 114514;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 3%;
  padding-bottom: 8%;
  color: antiquewhite;
}

</style>
