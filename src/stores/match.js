import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMatchStore = defineStore('match', () => {
  const pontosTimeA = ref(0)
  const pontosTimeB = ref(0)
  
  function incrementarPontosTimeA() {
    pontosTimeA.value++
  }

  function incrementarPontosTimeB() {
    pontosTimeB.value++
  }
  return { pontosTimeA, pontosTimeB, incrementarPontosTimeA, incrementarPontosTimeB }
})
