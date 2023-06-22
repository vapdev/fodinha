<script setup>
import { UseDraggable } from '@vueuse/components'
import { useElementBounding } from '@vueuse/core'
import { onMounted, ref, computed } from 'vue';

const spot = ref(null)
const { x, y } = useElementBounding(spot)
const initialValue = ref({ x: 0, y: 0 })

const props = defineProps({
	carta: {
		type: Object,
		default: () => ({ naipe: '', valor: '' }),
	},
	horizontal: {
		type: Boolean,
		default: false,
	},
	draggable: {
		type: Boolean,
		default: false,
	},
})

onMounted(() => {
	initialValue.value.x = x.value - 70
	initialValue.value.y = y.value - 65
})

const retornaImagem = (carta) => {
	let naipe = ''
	if (!carta) {
		return ''
	}
	if (carta.naipe.nome === 'OUROS') {
		naipe = 'DIAMOND'
	}
	if (carta.naipe.nome === 'ESPADAS') {
		console.log(props.carta + 'xx')
		naipe = 'SPADE'
	}
	if (carta.naipe.nome === 'COPAS') {
		naipe = 'HEART'
	}
	if (carta.naipe.nome === 'PAUS') {
		naipe = 'CLUB'
	}
	let valor = ''
	if (carta) {
		valor = carta.valor
		return `src/assets/cards/${naipe}-${valor}.svg`
	}
	return ''
}

</script>

<template>
	<div ref="spot">
	</div>
	<UseDraggable :style="draggable ? 'position: fixed' : ''" :initialValue="initialValue" v-slot="{ x, y }">
		<div class=" hover:bg-blue-100 ">
			<img :class="horizontal ? 'rotate-90' : 'mx-4'" class="w-24" :src="retornaImagem(carta)" />
		</div>
	</UseDraggable>
</template>
