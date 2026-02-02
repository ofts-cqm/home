<template>
  <div class="bg" v-if="timeLeft > 0">
    <div class="window">
        <p>Opening Remote Codespace...</p>
        <div class="progress_bar" :style="{width: `${(3000 - timeLeft) / 30}%`}"></div>
    </div>
  </div>
</template>

<style scoped>
.bg{
    position: absolute;
    background-color: #FFFFFF60;
    min-width: 100vw;
    min-height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.progress_bar{
    height: 5%;
    background-color: #3376CE;
}

.window{
    width: 25vw;
    height: 25vh;
    background-color: var(--color-background-dark);
    border-width: 2px;
    border-style: solid;
    border-color: #707070;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    font-size: 1.3rem;
    color: white;
}

p{
    padding: 2rem;
}
</style>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import router from '@/router'
import { useUIStore } from './../stores/control'

const timeLeft = ref(3000) // countdown start (seconds)
const control = useUIStore()
let intervalId = null

onMounted(() => {
    intervalId = setInterval(() => {
        if (timeLeft.value > 0) {
            timeLeft.value-=10
        } else {
            clearInterval(intervalId)
            control.showExplorer = true;
            router.push({ path: 'home' });
        }
    }, 10)

})

onUnmounted(() => {
    clearInterval(intervalId)
})
</script>
