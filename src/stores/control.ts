// stores/ui.js
import { defineStore } from 'pinia'

export const useUIStore = defineStore('control', {
  state: () => ({
    showExplorer: true
  }),
  actions: {
    toggleExplorer() {
      this.showExplorer = !this.showExplorer
    }
  }
})
