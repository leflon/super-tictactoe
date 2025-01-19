<script setup lang='ts'>
import OuterGrid from './components/OuterGrid.vue';
import Game from './types/Game';
import { computed, ref } from 'vue';

const game = ref<Game>(new Game());
const playing = computed(() => game.value.checkOutcome() === null);
const onPlay = (grid: number, cell: number) => {
	game.value.move(grid, cell)
};
</script>
<template>

	<h1 v-if='playing'>Turn: {{ game.currentPlayer }}</h1>
	<h1 v-else>Game over! {{ game.checkOutcome() === 'tie' ? 'It\'s a tie!' : `${game.checkOutcome()} won!` }}</h1>
	<button v-if='!playing' @click='game.reset'>Play again!</button>
	<OuterGrid :game @play='onPlay' :playing />
</template>


<style scoped>
h1 {
	text-align: center;
	color: white;
}
button {
	display: block;
	margin: 0 auto;
	padding: 10px;
	background-color: white;
	color: black;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	&:hover {
		background-color: rgba(255, 255, 255, 0.8);
	}
}
</style>