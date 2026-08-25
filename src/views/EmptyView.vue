<template>
  <div class="bg" v-if="timeLeft > 0">
    <div class="window">
      <div class="title">
        <h3>Macrohard Virtual Studio</h3>
        <p v-if="timeLeft > 1500">Connecting to Remote Host...</p>
        <p v-else>Opening Codespace...</p>
      </div>
      <div
        class="progress_bar"
        :style="{ width: `${(3000 - timeLeft) / 30}%` }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.bg {
  position: absolute;
  background-color: #ffffff60;
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

.progress_bar {
  height: 5%;
  background-color: #3376ce;
}

.window {
  width: 25vw;
  min-width: 350px;
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

.title {
  padding-left: 2rem;
  gap: 0.5rem;
  padding-top: 1rem;
}
</style>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import router from "@/router";
import { useUIStore } from "./../stores/control";

const timeLeft = ref(3000); // countdown start (seconds)
const control = useUIStore();
let intervalId: number;
let resizeTimer: number;

control.showExplorer = false;

onMounted(() => {
  intervalId = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value -= 10;
    } else {
      clearInterval(intervalId);
      control.showExplorer = true;

      document.body.classList.add("no-transition");
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        document.body.classList.remove("no-transition");
      }, 150);
      router.push({ path: "/home" });
    }
  }, 10);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>
