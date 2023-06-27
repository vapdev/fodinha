<template>
	<div class="bg-green-900 flex flex-col text-[1.3vw] justify-between text-white p-[1.5%]">
		<div class="flex justify-between">
			<div>Nome do jogador</div>
			<div>
				<span>🏆</span>
				<span>5</span>
			</div>
		</div>
		<div class="bg-green-800">
			<div class="bg-green-800 h-[30%] p-[1.5%] flex flex-col">
				<div class="text-center text-[2vh]">Informações da partida atual</div>
				<div class="border-[0.1vh] my-[1vh]"></div>
				<div class="flex justify-around text-[2vh]">
					<div>Time A</div>
					<div>Time B</div>
				</div>
				<div class="flex justify-around mt-[1vh]">
					<div>
						<div class="bg-green-800 h-[25%] text-black">
							<div class="border-white border-[0.2vh] w-[6vw] h-[2vw]">
								<div class="flex justify-around">
									<div class="border-white border-[0.2vh] w-[33%] h-[2vw] text-center text-white"><span v-if="match.pontosTimeA >= 1">X</span></div>
									<div class="border-white border-[0.2vh] w-[33%] text-center text-white"><span v-if="match.pontosTimeA >= 2">X</span></div>
									<div class="border-white border-[0.2vh] w-[33%] text-center text-white"><span v-if="match.pontosTimeA >= 3">X</span></div>
								</div>
							</div>
						</div>
						<div class="bg-green-800 h-[25%] text-black">
							<div class="border-white border-[0.2vh] w-[6vw] h-[2vw]">
								<div class="flex justify-around">
									<div class="border-white border-[0.2vh] w-[33%] h-[2vw] text-center text-white"><span v-if="match.pontosTimeA >= 4">X</span></div>
									<div class="border-white border-[0.2vh] w-[33%] text-center text-white"><span v-if="match.pontosTimeA >= 5">X</span></div>
									<div class="border-white border-[0.2vh] w-[33%] text-center text-white"><span v-if="match.pontosTimeA >= 6">X</span></div>
								</div>
							</div>
						</div>
						<div class="bg-green-800 h-[25%] text-black">
							<div class="border-white border-[0.2vh] w-[6vw] h-[2vw]">
								<div class="flex justify-around">
									<div class="border-white border-[0.2vh] w-[33%] h-[2vw] text-center text-white"><span v-if="match.pontosTimeA >= 7">X</span></div>
									<div class="border-white border-[0.2vh] w-[33%] text-center text-white"><span v-if="match.pontosTimeA >= 8">X</span></div>
									<div class="border-white border-[0.2vh] w-[33%] text-center text-white"><span v-if="match.pontosTimeA >= 9">X</span></div>
								</div>
							</div>
						</div>
						<div class="bg-green-800 h-[25%] text-black">
							<div class="border-white border-[0.2vh] w-[6vw] h-[2vw]">
								<div class="flex justify-around">
									<div class="border-white border-[0.2vh] w-[33%] h-[2vw] text-center text-white"><span v-if="match.pontosTimeA >= 10">X</span></div>
									<div class="border-white border-[0.2vh] w-[33%] text-center text-white"><span v-if="match.pontosTimeA >= 11">X</span></div>
									<div class="border-white border-[0.2vh] w-[33%] text-center text-white"><span v-if="match.pontosTimeA >= 12">X</span></div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div class="bg-green-800 h-[25%] text-black">
							<div class="border-white border-[0.2vh] w-[6vw] h-[2vw]">
								<div class="flex justify-around">
									<div class="border-white border-[0.2vh] w-[33%] h-[2vw] text-center text-white"><span v-if="match.pontosTimeB >= 1">X</span></div>
									<div class="border-white border-[0.2vh] w-[33%] text-center text-white"><span v-if="match.pontosTimeB >= 2">X</span></div>
									<div class="border-white border-[0.2vh] w-[33%] text-center text-white"><span v-if="match.pontosTimeB >= 3">X</span></div>
								</div>
							</div>
						</div>
						<div class="bg-green-800 h-[25%] text-black">
							<div class="border-white border-[0.2vh] w-[6vw] h-[2vw]">
								<div class="flex justify-around">
									<div class="border-white border-[0.2vh] w-[33%] h-[2vw] text-center text-white"><span v-if="match.pontosTimeB >= 4">X</span></div>
									<div class="border-white border-[0.2vh] w-[33%] text-center text-white"><span v-if="match.pontosTimeB >= 5">X</span></div>
									<div class="border-white border-[0.2vh] w-[33%] text-center text-white"><span v-if="match.pontosTimeB >= 6">X</span></div>
								</div>
							</div>
						</div>
						<div class="bg-green-800 h-[25%] text-black">
							<div class="border-white border-[0.2vh] w-[6vw] h-[2vw]">
								<div class="flex justify-around">
									<div class="border-white border-[0.2vh] w-[33%] h-[2vw] text-center text-white"><span v-if="match.pontosTimeB >= 7">X</span></div>
									<div class="border-white border-[0.2vh] w-[33%] text-center text-white"><span v-if="match.pontosTimeB >= 8">X</span></div>
									<div class="border-white border-[0.2vh] w-[33%] text-center text-white"><span v-if="match.pontosTimeB >= 9">X</span></div>
								</div>
							</div>
						</div>
						<div class="bg-green-800 h-[25%] text-black">
							<div class="border-white border-[0.2vh] w-[6vw] h-[2vw]">
								<div class="flex justify-around">
									<div class="border-white border-[0.2vh] w-[33%] h-[2vw] text-center text-white"><span v-if="match.pontosTimeB >= 10">X</span></div>
									<div class="border-white border-[0.2vh] w-[33%] text-center text-white"><span v-if="match.pontosTimeB >= 11">X</span></div>
									<div class="border-white border-[0.2vh] w-[33%] text-center text-white"><span v-if="match.pontosTimeB >= 12">X</span></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-col">
			<div>Convidar amigo</div>
			<div class="mt-[2%] w-[100%] h-[2vw] border-[0.1vh] rounded-[0.5vh]">adf.ly/wwwwwx12123123truco</div>
		</div>
	</div>
</template>

<script setup>
import { useMatchStore } from '../stores/match';
const match = useMatchStore();
</script>