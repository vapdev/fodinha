<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import Carta from './Carta.vue'
const cartasBaixo = ref([])
const cartasEsquerda = ref([])
const cartasDireita = ref([])
const cartasTopo = ref([])
const vira = ref(null)
const draggable = ref(false)
const jogadaPlayer1 = ref(null)
const jogadaPlayer2 = ref(null)
const jogadaPlayer3 = ref(null)
const jogadaPlayer4 = ref(null)
const turno = ref(1)
const manilha = ref(null)

const passaTurno = () => {
  if (turno.value === 1) {
    turno.value = 2
  } else if (turno.value === 2) {
    turno.value = 3
  } else if (turno.value === 3) {
    turno.value = 4
  } else if (turno.value === 4) {
    turno.value = 1
  }
}

const passaRodada = () => {
  vira.value = baralho.value.pop()
  jogadaPlayer1.value = null
  jogadaPlayer2.value = null
  jogadaPlayer3.value = null
  jogadaPlayer4.value = null
}

const turnoCompleto = computed(() => {
  return jogadaPlayer1.value && jogadaPlayer2.value && jogadaPlayer3.value && jogadaPlayer4.value
})

watch(turnoCompleto, (value) => {
  if (value) {
    calculaVencedor()
    passaRodada()
  }
})

const retornaVencedorDaManilha = (jogadas) => {
  const jogadas_com_manilha = jogadas.filter((jogada) => jogada.valor === manilha.value)
  let jogada = jogadas_com_manilha.sort((a, b) => {
    return a.naipe.valor - b.naipe.valor
  })[jogadas_com_manilha.length - 1]
  return jogada
}

const calculaVencedor = () => {
  const jogadas = [
    jogadaPlayer1.value,
    jogadaPlayer2.value,
    jogadaPlayer3.value,
    jogadaPlayer4.value
  ]
  const jogadasOrdenadas = jogadas.sort((a, b) => {
    const valorA = mapeiaValor(a.valor)
    const valorB = mapeiaValor(b.valor)
    return valorA - valorB
  })
  let vencedor = jogadasOrdenadas[3]

  if (jogadasOrdenadas.some((jogada) => jogada.valor === manilha.value)) {
    vencedor = retornaVencedorDaManilha(jogadasOrdenadas)
    // alert(`vencedor: ${vencedor.valor} de ${vencedor.naipe.nome}`);
    return
  }

  if (jogadasOrdenadas[2].valor === vencedor.valor) {
    // alert('EMPACHOU!')
    return
  } else {
    // alert(`vencedor: ${vencedor.valor} de ${vencedor.naipe.nome}`)
    if (vencedor === jogadaPlayer1.value) {
      // alert('player 1 venceu')
    } else if (vencedor === jogadaPlayer2.value) {
      // alert('player 2 venceu')
    } else if (vencedor === jogadaPlayer3.value) {
      // alert('player 3 venceu')
    } else if (vencedor === jogadaPlayer4.value) {
      // alert('player 4 venceu')
    }
  }
}

const jogaCarta = (carta, jogador) => {
  if (jogador !== turno.value) return
  passaTurno()
  if (jogador === 1) {
    jogadaPlayer1.value = carta
    cartasBaixo.value = cartasBaixo.value.filter((c) => c !== carta)
  } else if (jogador === 2) {
    jogadaPlayer2.value = carta
    cartasEsquerda.value = cartasEsquerda.value.filter((c) => c !== carta)
  } else if (jogador === 3) {
    jogadaPlayer3.value = carta
    cartasTopo.value = cartasTopo.value.filter((c) => c !== carta)
  } else if (jogador === 4) {
    jogadaPlayer4.value = carta
    cartasDireita.value = cartasDireita.value.filter((c) => c !== carta)
  }
}

// 1 ouros
// 2 espada
// 3 copas
// 4 paus
const naipes = [
  { nome: 'OUROS', valor: 1 },
  { nome: 'ESPADAS', valor: 2 },
  { nome: 'COPAS', valor: 3 },
  { nome: 'PAUS', valor: 4 }
]
const valores = ['4', '5', '6', '7', '11', '12', '13', '1', '2', '3']

const mapeiaValor = (valor) => {
  if (valor === manilha.value) return 11
  if (valor === '4') return 1
  if (valor === '5') return 2
  if (valor === '6') return 3
  if (valor === '7') return 4
  if (valor === '11') return 5
  if (valor === '12') return 6
  if (valor === '13') return 7
  if (valor === '1') return 8
  if (valor === '2') return 9
  if (valor === '3') return 10
}
const baralho = ref([])
for (let naipe of naipes) {
  for (let valor of valores) {
    baralho.value.push({ naipe, valor })
  }
}
baralho.value = baralho.value.sort(() => Math.random() - 0.5)

const darAsCartas = () => {
  cartasBaixo.value = []
  cartasEsquerda.value = []
  cartasDireita.value = []
  cartasTopo.value = []
  for (let i = 0; i < 3; i++) {
    cartasBaixo.value.push(baralho.value.pop())
    cartasEsquerda.value.push(baralho.value.pop())
    cartasDireita.value.push(baralho.value.pop())
    cartasTopo.value.push(baralho.value.pop())
  }
  vira.value = baralho.value.pop()
  const index = valores.indexOf(vira.value.valor)
  manilha.value = valores[index + 1]
  if (valores[index] == '3') manilha.value = valores[0]
}

const pescarCarta = () => {
  const carta = baralho.value.pop()
  cartasBaixo.value.push(carta)
}

onMounted(() => {
  darAsCartas()
})
</script>

<template>
  <div class="bg-green-300 w-[100%] h-[100vh] flex">
    <div class="w-[14%] bg-green-800 flex flex-col items-center justify-center">
      <div class="text-[1vw]">Player 2</div>
      <Carta
        v-for="carta in cartasEsquerda"
        horizontal
        :carta="carta"
        @click="jogaCarta(carta, 2)"
      />
      <div class="w-[1vw] h-[1vw] bg-yellow-300 rounded-full" v-if="turno == 2"></div>
    </div>

    <div class="w-full flex flex-col bg-green-800">
      <div class="h-1/3 bg-green-800 flex justify-center items-center">
        <div class="flex items-center flex-col">
          <div class="text-[1vw]">Player 3</div>
          <div class="flex flex-row">
            <div v-for="carta in cartasTopo" @click="jogaCarta(carta, 3)">
              <Carta :carta="carta" />
            </div>
            <div class="w-[1vw] h-[1vw] bg-yellow-300 rounded-full" v-if="turno == 3"></div>
          </div>
        </div>
      </div>
      <div class="h-full w-full rounded-xl flex items-center justify-center">
        <div class="w-full flex justify-center items-center">
          <Carta horizontal :carta="jogadaPlayer2" />
        </div>
        <div class="relative h-full w-1/3 flex flex-col items-center justify-center">
          <div class="h-full flex items-center">
            <Carta 
            v-show="jogadaPlayer3"
            :carta="jogadaPlayer3" />
          </div>
          <div class="flex items-center justify-center">
            <!-- <div class="w-[5vw] text-[1vw] flex items-center justify-center"> -->
            <!-- {{ baralho.length }} -->
            <Carta />
            <!-- </div> -->
            <Carta v-if="vira" :carta="vira" />
          </div>
          <div class="h-full flex flex-col w-[5vw] justify-center group items-center">
            <transition
              enter-active-class="duration-300 ease-out"
              enter-from-class="transform -translate-y-0 -bottom-[8.2vw]"
              enter-to-class="opacity-100 -translate-y-48 -bottom-[8.125vw] rotate-180"
              leave-active-class="duration-200 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="transform"
            >
              <Carta
                v-show="jogadaPlayer1"
                class="absolute"
                :carta="jogadaPlayer1"
              />
            </transition>
          </div>
        </div>
        <div class="w-full flex justify-center items-center">
          <Carta horizontal :carta="jogadaPlayer4" />
        </div>
      </div>
      <div class="h-1/3 flex justify-center items-center bg-green-800">
        <div class="flex items-center flex-col">
          <div class="flex flex-row">
            <div v-for="carta in cartasBaixo" @click="jogaCarta(carta, 1)">
              <Carta :carta="carta" />
            </div>
            <div class="w-[1vw] h-[1vw] bg-yellow-300 rounded-full" v-if="turno == 1"></div>
          </div>
          <div class="text-[1vw]">Player 1</div>
        </div>
      </div>
    </div>

    <div class="w-[14%] bg-green-800 flex flex-col items-center justify-center">
      <div class="text-[1vw]">Player 4</div>
      <div v-for="carta in cartasDireita" @click="jogaCarta(carta, 4)">
        <Carta horizontal :carta="carta" />
      </div>
      <div class="w-[1vw] h-[1vw] bg-yellow-300 rounded-full" v-if="turno == 4"></div>
    </div>
  </div>
</template>
