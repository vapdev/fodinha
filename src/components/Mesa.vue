<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import Carta from './Carta.vue'
const cartasPlayer1 = ref([])
const cartasPlayer2 = ref([])
const cartasPlayer4 = ref([])
const cartasPlayer3 = ref([])
const vira = ref(null)
const draggable = ref(false)
const jogadaPlayer1 = ref(null)
const jogadaPlayer2 = ref(null)
const jogadaPlayer3 = ref(null)
const jogadaPlayer4 = ref(null)
const turno = ref(1)
const rodada = ref(1)
const manilha = ref(null)
const pontosTimeA = ref(0)
const pontosTimeB = ref(0)
const passandoRodada = ref(false)
const timeVencedorTurno1 = ref(null)
const timeVencedorTurno2 = ref(null)
const timeVencedorTurno3 = ref(null)
const passandoPonto = ref(false)
const timeVencedorRodada = ref(null)

const atribuiTimeVencedorTurno = (time = null) => {
  if (jogadaVencedora.value.jogador === 1 || jogadaVencedora.value.jogador === 3) {
    time = 'A'
  } else {
    time = 'B'
  }
  if (rodada.value === 1) {
    timeVencedorTurno1.value = time
  } else if (rodada.value === 2) {
    timeVencedorTurno2.value = time
  } else if (rodada.value === 3) {
    timeVencedorTurno3.value = time
  }
}

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

const contaPontos = () => {
  let countTimeA = 0
  let countTimeB = 0
  if (timeVencedorTurno1.value == 'A') {
    countTimeA++
  } else {
    countTimeB++
  }
  if (timeVencedorTurno2.value == 'A') {
    countTimeA++
  } else {
    countTimeB++
  }
  if (timeVencedorTurno3.value == 'A') {
    countTimeA++
  } else {
    countTimeB++
  }
  if (countTimeA > countTimeB) {
    pontosTimeA.value++;
    timeVencedorRodada.value = 'A'
  } else {
    pontosTimeB.value++;
    timeVencedorRodada.value = 'B'
  }
  passandoPonto.value = true
  setTimeout(() => {
    passandoPonto.value = false
  }, 5000)
}


const prontoPraContar = computed(() => {
  return cartasPlayer1.value.length === 0 &&
    cartasPlayer2.value.length === 0 &&
    cartasPlayer3.value.length === 0 &&
    cartasPlayer4.value.length === 0
})


watch(prontoPraContar, (value) => {
  if (value) {
    contaPontos()
  }
})

const passaRodada = () => {
  jogadaPlayer1.value = null
  jogadaPlayer2.value = null
  jogadaPlayer3.value = null
  jogadaPlayer4.value = null
  passandoRodada.value = true
  setTimeout(() => {
    passandoRodada.value = false
  }, 5000)
  rodada.value++
  vira.value = baralho.value.pop()
}

const turnoCompleto = computed(() => {
  return jogadaPlayer1.value && jogadaPlayer2.value && jogadaPlayer3.value && jogadaPlayer4.value
})

const jogadorVencedor = ref(null)
const jogadaVencedora = ref(null)

watch(turnoCompleto, (value) => {
  if (value) {
    calculaVencedor()
    atribuiTimeVencedorTurno()
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
    jogadaVencedora.value = vencedor
    setTimeout(() => {
      jogadaVencedora.value = null
    }, 2300)
    return
  }

  if (jogadasOrdenadas[2].valor === vencedor.valor) {
    vencedor.empachou = true
    jogadaVencedora.value = vencedor
    setTimeout(() => {
      jogadaVencedora.value = null
    }, 2300)
    return
  }
  jogadaVencedora.value = vencedor
  setTimeout(() => {
    jogadaVencedora.value = null
  }, 2300)
  return
}

const jogaCarta = (carta, jogador) => {
  if (jogador !== turno.value) return
  passaTurno()
  if (jogador === 1) {
    jogadaPlayer1.value = carta
    jogadaPlayer1.value.jogador = 1
    cartasPlayer1.value = cartasPlayer1.value.filter((c) => c !== carta)
  } else if (jogador === 2) {
    jogadaPlayer2.value = carta
    jogadaPlayer2.value.jogador = 2
    cartasPlayer2.value = cartasPlayer2.value.filter((c) => c !== carta)
  } else if (jogador === 3) {
    jogadaPlayer3.value = carta
    jogadaPlayer3.value.jogador = 3
    cartasPlayer3.value = cartasPlayer3.value.filter((c) => c !== carta)
  } else if (jogador === 4) {
    jogadaPlayer4.value = carta
    jogadaPlayer4.value.jogador = 4
    cartasPlayer4.value = cartasPlayer4.value.filter((c) => c !== carta)
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
const valores = ['4', '5', '6', '7', 'Q', 'J', 'K', 'A', '2', '3']

const cartaVencedoraComputed = computed(() => {
  if (!jogadaVencedora.value) return ''
  let naipe = ''
  if (jogadaVencedora.value.naipe.nome === 'OUROS') {
    naipe = '♦️'
  }
  if (jogadaVencedora.value.naipe.nome === 'ESPADAS') {
    naipe = '♠️'
  }
  if (jogadaVencedora.value.naipe.nome === 'COPAS') {
    naipe = '♥️'
  }
  if (jogadaVencedora.value.naipe.nome === 'PAUS') {
    naipe = '♣️'
  }
  return `${jogadaVencedora.value.valor}${naipe}`
})

const jogadorVencedorComputed = computed(() => {
  if (!jogadaVencedora.value) return ''
  const jogador = jogadaVencedora.value.jogador
  if (jogador === 1) return 'Player 1'
  if (jogador === 2) return 'Player 2'
  if (jogador === 3) return 'Player 3'
  if (jogador === 4) return 'Player 4'
})

const mapeiaValor = (valor) => {
  if (valor === manilha.value) return 11
  if (valor === '4') return 1
  if (valor === '5') return 2
  if (valor === '6') return 3
  if (valor === '7') return 4
  if (valor === 'Q') return 5
  if (valor === 'J') return 6
  if (valor === 'K') return 7
  if (valor === 'A') return 8
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
  cartasPlayer1.value = []
  cartasPlayer2.value = []
  cartasPlayer4.value = []
  cartasPlayer3.value = []
  for (let i = 0; i < 3; i++) {
    cartasPlayer1.value.push(baralho.value.pop())
    cartasPlayer2.value.push(baralho.value.pop())
    cartasPlayer4.value.push(baralho.value.pop())
    cartasPlayer3.value.push(baralho.value.pop())
  }
  vira.value = baralho.value.pop()
  const index = valores.indexOf(vira.value.valor)
  manilha.value = valores[index + 1]
  if (valores[index] == '3') manilha.value = valores[0]
}

const pescarCarta = () => {
  const carta = baralho.value.pop()
  cartasPlayer1.value.push(carta)
}

onMounted(() => {
  darAsCartas()
})
</script>

<template>
  <div class="bg-green-300 w-[100%] h-[100vh] flex">
    <div class="w-[14%] bg-green-800 flex flex-col items-center justify-center">
      <div class="text-[1vw]">Player 2</div>
      <Carta v-for="carta in cartasPlayer2" horizontal :carta="carta" @click="jogaCarta(carta, 2)" />
      <div class="w-[1vw] h-[1vw] bg-yellow-300 rounded-full" v-if="turno == 2"></div>
    </div>
    <div class="w-full flex flex-col bg-green-800">
      <div class="h-1/3 bg-green-800 flex justify-center items-center">
        <div class="flex items-center flex-col">
          <div class="text-[1vw]">Player 3</div>
          <div class="flex flex-row">
            <div v-for="carta in cartasPlayer3" @click="jogaCarta(carta, 3)">
              <Carta :carta="carta" />
            </div>
            <div class="w-[1vw] h-[1vw] bg-yellow-300 rounded-full" v-if="turno == 3"></div>
          </div>
        </div>
      </div>
      <div class="h-full w-full rounded-xl flex items-center justify-center">
        <div class="w-full flex justify-center items-center">
          <Carta v-show="jogadaPlayer2" horizontal :carta="jogadaPlayer2" />
        </div>
        <div class="relative h-full w-1/3 flex flex-col items-center justify-center">
          <div class="h-full flex items-center">
            <Carta v-show="jogadaPlayer3" :carta="jogadaPlayer3" />
          </div>
          <div class="flex items-center justify-center">
            <!-- <div class="w-[5vw] text-[1vw] flex items-center justify-center"> -->
            <!-- {{ baralho.length }} -->
            <Carta />
            <!-- </div> -->
            <Carta v-if="vira" :carta="vira" />
          </div>
          <div class="h-full flex flex-col w-[5vw] justify-center group items-center">
            <transition enter-active-class="duration-300 ease-out"
              enter-from-class="transform -translate-y-0 -bottom-[8.2vw]"
              enter-to-class="opacity-100 -translate-y-[10.3vw] -bottom-[8.125vw] rotate-180"
              leave-active-class="duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="transform">
              <Carta v-show="jogadaPlayer1" class="absolute" :carta="jogadaPlayer1" />
            </transition>
          </div>
        </div>
        <div class="w-full flex justify-center items-center">
          <Carta v-show="jogadaPlayer4" horizontal :carta="jogadaPlayer4" />
        </div>
      </div>
      <div class="h-1/3 flex justify-center items-center bg-green-800">
        <div class="flex items-center flex-col">
          <div v-show="jogadaVencedora || passandoRodada" class="absolute bottom-[28.5vw] text-[2vw] text-white">
            <span v-if="jogadaVencedora">
              {{ jogadorVencedorComputed }} ganhou com a carta: {{ cartaVencedoraComputed }}
            </span>
            <span v-if="passandoPonto">
              1 ponto para o time {{ timeVencedorRodada }}
            </span>
          </div>
          <div class="flex flex-row">
            <div v-for="carta in cartasPlayer1" @click="jogaCarta(carta, 1)">
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
      <div v-for="carta in cartasPlayer4" @click="jogaCarta(carta, 4)">
        <Carta horizontal :carta="carta" />
      </div>
      <div class="w-[1vw] h-[1vw] bg-yellow-300 rounded-full" v-if="turno == 4"></div>
      <div class="absolute bottom-[1.5vw] mr-[5vw] text-[1vw] text-white text-right">
        <div class="">1º rodada: Time {{ timeVencedorTurno1 }} </div>
        <div class="">2º rodada: Time {{ timeVencedorTurno2 }} </div>
        <div class="">3º rodada: Time {{ timeVencedorTurno3 }} </div>
      </div>
    </div>
  </div>
</template>
