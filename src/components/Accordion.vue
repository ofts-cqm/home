<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({ 
  title: {
    type: String,
    required: true
  }
})

const display = ref('none');

function onClick(){
    if (display.value === 'none') display.value = 'block';
    else display.value = 'none';
}
</script>

<template>
  <button class="accordion", @click="onClick">{{title}}</button>
    <div class="panel", :style="'display: ' + display">
        <slot></slot>
    </div>
</template>

<style scoped>
.accordion {
  background-color: #333;
  color: #fff;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  text-align: left;
  border: none;
  outline: none;
  transition: 0.4s;
  margin-bottom: 50px;
}

/* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
.active, .accordion:hover {
  background-color: #444;
}

/* Style the accordion panel. Note: hidden by default */
.panel {
  padding: 0 18px;
  margin-bottom: 100px;
  background-color: black;
  overflow: hidden;
}
</style>