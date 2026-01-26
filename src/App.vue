<script setup lang="ts">
import { RouterView } from 'vue-router'
import FileExplorer from './components/FileExplorer.vue';
import { useUIStore } from './stores/control'
import ToolBar from './components/ToolBar.vue';

const control = useUIStore()
</script>

<template>
  <div class="main">
    <div class="header">
      <!--div class="tools"-->
        <pre class="tools">Code  File  Edit  Selection  View  Go  Run  Terminal  Window  Help</pre>
      <!--/div-->

      <p class="title">Macrohard Virtual Studio Code v6.7.0</p>
    </div>

    <div class="content">
      <ToolBar/>

      <div class="explor-edit">
        <FileExplorer class="explorer" :class="{'open-explorer': control.showExplorer, 'close-explorer': !control.showExplorer}"/>

        <div class="editor editorLayout" :class="{'open-editor': control.showExplorer}">
          <RouterView />
        </div>
      </div>
    </div>

    <div class="footer">
      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9041 9.57067L8.9281 5.59463L12.9041 1.6186L12.2854 0.999878L8.00002 5.28527V5.90399L12.2854 10.1894L12.9041 9.57067ZM3 5.61874L7.07191 9.69064L3 13.7626L3.61872 14.3813L7.99999 10V9.38128L3.61872 5.00002L3 5.61874Z" fill="#C5C5C5"/>
      </svg>
      <div class="errors">
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.59975 0.999985C10.1998 1.09999 11.6998 1.89999 12.7998 2.99999C14.0998 4.39999 14.7998 6.09999 14.7998 8.09999C14.7998 9.69999 14.1998 11.2 13.1998 12.5C12.1998 13.7 10.7998 14.6 9.19975 14.9C7.59975 15.2 5.99975 15 4.59975 14.2C3.19975 13.4 2.09975 12.2 1.49975 10.7C0.899753 9.19999 0.799753 7.49999 1.29975 5.99999C1.79975 4.39999 2.69975 3.09999 4.09975 2.19999C5.39975 1.29999 6.99975 0.899985 8.59975 0.999985ZM9.09975 13.9C10.3998 13.6 11.5998 12.9 12.4998 11.8C13.2998 10.7 13.7998 9.39999 13.6998 7.99999C13.6998 6.39999 13.0998 4.79999 11.9998 3.69999C10.9998 2.69999 9.79975 2.09999 8.39975 1.99999C7.09975 1.89999 5.69975 2.19999 4.59975 2.99999C3.49975 3.79999 2.69975 4.89999 2.29975 6.29999C1.89975 7.59999 1.89975 8.99999 2.49975 10.3C3.09975 11.6 3.99975 12.6 5.19975 13.3C6.39975 14 7.79975 14.2 9.09975 13.9ZM7.89974 7.5L10.2997 5L10.9997 5.7L8.59974 8.2L10.9997 10.7L10.2997 11.4L7.89974 8.9L5.49974 11.4L4.79974 10.7L7.19974 8.2L4.79974 5.7L5.49974 5L7.89974 7.5Z" fill="#C5C5C5"/>
        </svg>
        <p>0</p>
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.55976 1H8.43976L14.9798 13.26L14.5398 14H1.43976L0.999756 13.26L7.55976 1ZM7.99976 2.28L2.27976 13H13.6998L7.99976 2.28ZM8.62476 12V11H7.37476V12H8.62476ZM7.37476 10V6H8.62476V10H7.37476Z" fill="#C5C5C5"/>
        </svg>
        <p>0</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  width: 100vw;
  height: 4vh;
  background-color: var(--color-background-dark);
  border-style: solid;
  border-width: 0 0 1px 0;
  border-color: #2B2B2B;
  display: flex;
  place-content: flex-start;
  color: white;
  font-size: 1.1rem;
  flex-direction: row;
  padding-left: 1.5rem;
  overflow: hidden;
}

.tools{
  width: 0;
  flex-grow: 1;
  flex-shrink: 2;
  flex-direction: row;
  display: flex;
  gap: 1rem;
  overflow: hidden;
  white-space: pre-wrap;
}

.title{
  flex-grow: 0;
  flex-shrink: 0;
  text-align: right;
  padding-right: 2rem;
  white-space: nowrap;
  padding-left: 3rem;
}

.footer {
  width: 100vw;
  height: 3vh;
  display: flex;
  flex-direction: row;
  border-style: solid;
  border-width: 1px 0 0 0;
  border-color: #2B2B2B;
  padding-left: 1rem;
  font-size: 1rem;
}

.footer svg {
  height: 90%;
  aspect-ratio: 1;
  padding: 1px;
}

.errors {
  margin-left: 2rem;
  display: flex;
  flex-direction: row;
  font-size: 1.2rem;
  align-items: center;
}

.main {
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
}

.content {
  display: flex;
  width: 100vw;
  height: 93vh;
  flex-direction: row;
  overflow: hidden;
}

.explor-edit{
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

.editor {
  min-height: 100%;
  min-width: 0;
  width: 100%;
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
    min-width: 100%;
    min-height: 0;
    height: 100%;
    overflow: auto;
  }

  .open-editor{
    height: 70%;
  }

  .open-explorer{
    height: 30%;
  }

  .close-explorer{
    height: 0;
  }

  .explorer {
    margin-top: 0;
    min-height: 0;
    min-width: 100%;
    display: block;
    place-items: flex-start;
    font-size: 1rem;
    border-style: solid;
    border-width: 1px 0 0 0;
    border-color: #2B2B2B;
    overflow: hidden;
  }
}


</style>
