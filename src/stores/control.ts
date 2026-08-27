// stores/ui.js
import { defineStore } from 'pinia'

export const useUIStore = defineStore('control', {
  state: () => ({
    showExplorer: true,
    showTerminal: false,
  }),
  actions: {
    toggleExplorer() {
      if (
        typeof window !== 'undefined' &&
        window.matchMedia('(max-width: 800px)').matches &&
        this.showTerminal
      ) {
        this.showTerminal = false
        this.showExplorer = true
        return
      }

      this.showExplorer = !this.showExplorer
    },
    toggleTerminal() {
      this.showTerminal = !this.showTerminal

      if (
        typeof window !== 'undefined' &&
        window.matchMedia('(max-width: 800px)').matches &&
        !this.showTerminal
      ) {
        this.showExplorer = true
      }
    },
  },
})
