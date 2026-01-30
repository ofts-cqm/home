<script setup lang="ts">
const props = defineProps({ 
  src: {
    type: String,
    required: true
  },
  languages: {
    type: Array<string>,
    default: () => []
  }
})
import { computed } from 'vue';
import LanguageChip from './LanguageChip.vue';

const imageUrl = computed(() => {
  return new URL(`../assets/${props.src}`, import.meta.url).href
})
</script>

<template>
  <div class="card">
    <div class="card-inner">
      <div class="card-front">
        <p class="heading" >
          <slot name="name"></slot>
        </p>
        <img class="image" :src="imageUrl"/>
        <p class="languages">
          <LanguageChip v-for="language in languages" :language="language"/>
        </p>
      </div>
      <div class="card-back">
        <p>
          <slot></slot>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .heading {
    height: 15%;
    font-size: 8cqw;
    align-items: center;
  }

  .image {
    height: 70%;
  }

  .languages{
    height: 15%;
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 5%;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  img {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
  }

  .card {
    width: 100%;
    height: 100%;
    aspect-ratio: 0.7;
  }

  .card-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.999s;
  }

  .card:hover .card-inner {
    transform: rotateY(180deg);
  }

  .card-front,
  .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }

  .card-front {
    background-color: var(--color-background-soft);
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 10px solid var(--color-background-soft);
    border-radius: 10px;
    font-size: 1.5rem;
    container-type: inline-size;
    transform: rotateY(0deg);
  }

  .card-back {
    background-color: var(--color-background-dark);
    color: #fff;
    display: flex;
    align-items: center;
    border: 5px solid black;
    border-radius: 10px;
    justify-content: center;
    font-size: 0.9rem;
    padding: 0.5rem;
    transform: rotateY(180deg);
  }
</style>