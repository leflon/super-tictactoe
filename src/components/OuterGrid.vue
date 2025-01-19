<script lang='ts' setup>
import InnerGrid from './InnerGrid.vue';
import Game from '../types/Game';
import { computed } from 'vue';

const props = defineProps<{
	game: Game,
	playing: boolean
}>();
const emit = defineEmits(['play']);
</script>
<template>
	<div class="outer-grid" :class="{ 'end': !props.playing }">
		<div class='outer-cell' v-for='i in 9' :key='i' :data-index='i - 1'>
			<div class='super-value'>
				{{ game.superBoard[i - 1] !== 'tie' ? game.superBoard[i - 1] : '' }}
			</div>
			<InnerGrid
				:active='props.game.superBoard[i - 1] === null && props.game.getNextGrid() === null ? true : props.game.getNextGrid() === i - 1'
				:grid='props.game.board[i - 1]' @play='emit("play", i - 1, $event)' />
		</div>
	</div>
</template>
<style scoped>
.outer-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(3, 1fr);
	width: 600px;
	height: 600px;
	max-width: 90vw;
	max-height: 90vw;
	margin: 10px auto;
}

.end>* {
	pointer-events: none;
}

.outer-cell {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px;
}

.super-value {
	position: absolute;
	top: 50%;
	left: 50%;
	font: bold 10em sans-serif;
	color: white;
	transform: translate(-50%, -50%);
}

.outer-cell[data-index='0'],
.outer-cell[data-index='1'],
.outer-cell[data-index='3'],
.outer-cell[data-index='4'],
.outer-cell[data-index='6'],
.outer-cell[data-index='7'] {
	border-right: 2px solid white;
}

.outer-cell[data-index='0'],
.outer-cell[data-index='1'],
.outer-cell[data-index='2'],
.outer-cell[data-index='3'],
.outer-cell[data-index='4'],
.outer-cell[data-index='5'] {
	border-bottom: 2px solid white;
}
</style>