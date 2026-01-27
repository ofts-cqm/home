<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import FileExplorer from './components/FileExplorer.vue';
import { useUIStore } from './stores/control'
import ToolBar from './components/ToolBar.vue';
import Frame from './components/Frame.vue';
import IconMarkdown from './components/icons/IconMarkdown.vue';

const control = useUIStore()
const route = useRoute();
</script>

<template>
  <Frame style="position: fixed;">
    <ToolBar/>

    <div class="explor-edit">
      <FileExplorer class="explorer" :class="{'open-explorer': control.showExplorer, 'close-explorer': !control.showExplorer}"/>

      <div class="editor editorLayout" :class="{'open-editor': control.showExplorer}">
        <div class="file-tag">
          <div class="open-file">
            <IconMarkdown/>
            {{ route.meta.label }}
          </div>
          <div class="tag-space"></div>
        </div>
        <RouterView class="file-view"/>
      </div>
    </div>
  </Frame>
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
}


.explor-edit{
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

.editor {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.explorer {
  margin-top: 1rem;
  min-height: 100%;
  min-width: 0;
  width: 0;
  display: block;
  place-items: flex-start;
  font-size: 1rem;
  border-style: solid;
  border-width: 0 1px 0 0;
  border-color: #2B2B2B;
  overflow: hidden;
}

.open-editor{
  width: 80%;
}

.open-explorer{
  width: 20%;
}

.close-explorer{
  width: 0%;
}

@media (max-width: 800px) {
  .explor-edit{
    flex-direction: column-reverse;
  }

  .editor{
    height: 100%;
  }

  .open-editor{
    height: 70%;
    width: 100%;
  }

  .open-explorer{
    height: 30%;
    width: 100%;
  }

  .close-explorer{
    height: 0;
    width: 100%;
  }

  .explorer {
    margin-top: 0;
    min-width: 100%;
    min-height: 0;
    border-style: solid;
    border-width: 1px 0 0 0;
    border-color: #2B2B2B;
  }
}


</style>
