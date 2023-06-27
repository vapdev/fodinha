<script setup>
const props = defineProps({
	carta: {
		type: Object,
		default: () => ({ naipe: '', valor: '' }),
	},
	horizontal: {
		type: Boolean,
		default: false,
	},
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
	<img :class="horizontal ? 'rotate-90 -my-[0.5vw]' : 'mx-[0.5vw]'" class="w-[5vw]" :src="retornaImagem(carta)" />
</template>
