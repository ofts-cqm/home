<template>
  <div class="editor-surface">
    <div
      class="bg"
      :class="{ 'is-sliding': phase === 'sliding' }"
      @animationend="handleSlideEnd"
    >
      <div class="window">
        <div class="title">
          <h3>Macrohard Virtual Studio</h3>
          <p aria-live="polite">{{ statusText }}</p>
        </div>
        <div
          class="progress-track"
          role="progressbar"
          aria-label="Opening codespace"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-valuenow="Math.round(progress)"
        >
          <div
            class="progress-bar"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.editor-surface {
  width: 100%;
  height: 100%;
  background-color: #171717;
  overflow: hidden;
}

.bg {
  position: fixed;
  z-index: 9999;
  background-color: #ffffff60;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center;
  will-change: transform;
}

.bg.is-sliding {
  animation: splash-slide-left 900ms cubic-bezier(0.58, 0.01, 0.72, 1) both;
}

.progress-track {
  width: 100%;
  height: 0.65rem;
  overflow: hidden;
  background-color: #292929;
}

.progress-bar {
  height: 100%;
  background-color: #3376ce;
}

.window {
  width: min(28rem, calc(100vw - 2rem));
  height: clamp(11rem, 25vh, 15rem);
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
  padding: 1rem 2rem 0;
  gap: 0.5rem;
}

@keyframes splash-slide-left {
  0% {
    transform: translateX(0) rotate(0deg);
  }

  14% {
    transform: translateX(2.5vw) rotate(0.35deg);
  }

  31% {
    transform: translateX(-1.5vw) rotate(-0.6deg);
  }

  48% {
    transform: translateX(-9vw) rotate(0.55deg);
  }

  65% {
    transform: translateX(-31vw) rotate(-0.4deg);
  }

  82% {
    transform: translateX(-72vw) rotate(0.2deg);
  }

  100% {
    transform: translateX(-110vw) rotate(0deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .bg.is-sliding {
    animation-duration: 1ms;
  }
}
</style>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import router from "@/router";
import { useUIStore } from "./../stores/control";

interface BurstStage {
  kind: "burst";
  target: number;
  step: [number, number];
  delay: [number, number];
  status: string;
}

interface PauseStage {
  kind: "pause";
  duration: [number, number];
  status: string;
}

type LoadingStage = BurstStage | PauseStage;

const progress = ref(0);
const phase = ref<"loading" | "sliding">("loading");
const statusText = ref("Connecting to Remote Host...");
const control = useUIStore();
const scheduledTimers = new Set<number>();
let handoffStarted = false;

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const stages: LoadingStage[] = [
  {
    kind: "burst",
    target: randomInteger(30, 40),
    step: [3, 8],
    delay: [55, 135],
    status: "Connecting to Remote Host...",
  },
  {
    kind: "pause",
    duration: [750, 1150],
    status: "Waiting for remote host...",
  },
  {
    kind: "burst",
    target: randomInteger(68, 79),
    step: [3, 7],
    delay: [55, 130],
    status: "Downloading workspace...",
  },
  {
    kind: "pause",
    duration: [250, 550],
    status: "Checking extensions...",
  },
  {
    kind: "burst",
    target: randomInteger(90, 95),
    step: [2, 4],
    delay: [90, 160],
    status: "Starting workspace services...",
  },
  {
    kind: "pause",
    duration: [600, 950],
    status: "Almost there...",
  },
  {
    kind: "burst",
    target: 100,
    step: [1, 3],
    delay: [100, 180],
    status: "Opening Codespace...",
  },
];

control.showExplorer = false;

function schedule(callback: () => void, delay: number) {
  const timerId = window.setTimeout(() => {
    scheduledTimers.delete(timerId);
    callback();
  }, delay);

  scheduledTimers.add(timerId);
}

function finishLoading() {
  progress.value = 100;
  statusText.value = "Codespace ready";
  schedule(() => {
    phase.value = "sliding";
  }, 200);
}

function runStage(stageIndex: number) {
  const stage = stages[stageIndex];

  if (!stage) {
    finishLoading();
    return;
  }

  statusText.value = stage.status;

  if (stage.kind === "pause") {
    schedule(
      () => runStage(stageIndex + 1),
      randomInteger(...stage.duration),
    );
    return;
  }

  if (progress.value >= stage.target) {
    schedule(() => runStage(stageIndex + 1), randomInteger(70, 130));
    return;
  }

  progress.value = Math.min(
    stage.target,
    progress.value + randomInteger(...stage.step),
  );
  schedule(() => runStage(stageIndex), randomInteger(...stage.delay));
}

function handleSlideEnd(event: AnimationEvent) {
  if (
    phase.value !== "sliding" ||
    event.target !== event.currentTarget ||
    handoffStarted
  ) {
    return;
  }

  handoffStarted = true;
  document.body.classList.add("no-transition");
  control.showExplorer = true;
  control.showTerminal = !window.matchMedia("(max-width: 800px)").matches;
  control.startBootFlicker();
  void router.push({ path: "/home" });
}

onMounted(() => runStage(0));

onUnmounted(() => {
  for (const timerId of scheduledTimers) {
    window.clearTimeout(timerId);
  }

  scheduledTimers.clear();

  if (!control.showBootFlicker) {
    document.body.classList.remove("no-transition");
  }
});
</script>
