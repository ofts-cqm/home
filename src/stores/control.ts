// stores/ui.js
import { defineStore } from 'pinia'

export const useUIStore = defineStore('control', {
  state: () => ({
    showExplorer: false
  }),
  actions: {
    toggleExplorer() {
      this.showExplorer = !this.showExplorer
    }
  }
})
