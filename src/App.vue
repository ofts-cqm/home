<script setup lang="ts">
import FileExplorer from './components/FileExplorer.vue';
import { useUIStore } from './stores/control'
import ToolBar from './components/ToolBar.vue';
import Frame from './components/Frame.vue';
import FileEditor from './components/FileEditor.vue';
import { onBeforeUnmount, onMounted } from 'vue';

const control = useUIStore()

let resizeTimer:number;

function resizeListener(){
  document.body.classList.add('no-transition');
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove('no-transition');
  }, 150);
}

onMounted(() => window.addEventListener('resize', resizeListener) );

onBeforeUnmount(() => window.removeEventListener('resize', resizeListener) );
</script>

<template>
  <Frame style="position: fixed;">
    <ToolBar/>

    <div class="explor-edit">
      <FileExplorer class="explorer" :class="{'open-explorer': control.showExplorer, 'close-explorer': !control.showExplorer}"/>
      <FileEditor class="editor" :class="{'open-editor': control.showExplorer}"/>
    </div>
  </Frame>
</template>

<style scoped>
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
