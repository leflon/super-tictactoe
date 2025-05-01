<script lang="ts" setup>
import type { Grid } from '@/types/Grid';
import { computed } from 'vue';
const props = defineProps<{
	active: boolean
	grid: Grid
}>();

const emit = defineEmits(['play']);

const className = computed(() => props.active ? 'inner-grid active' : 'inner-grid');

const play = (index: number) => {
	if (props.active)
		emit('play', index);
};
</script>
<template>
	<div :class='className'>
		<div class='inner-cell' v-for='i in 9' :key='i' :data-index='i - 1' @click='play(i - 1)'>
			{{ props.grid[i - 1] }}
		</div>
	</div>
</template>

<style scoped>
.inner-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(3, 1fr);
	width: 100%;
	height: 100%;
	opacity: .2;

	&.active {
		opacity: 1;
	}
}

.inner-cell {
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	font: bold 12pt sans-serif;
}

.active .inner-cell:hover {
	cursor: pointer;
	background-color: rgba(255, 255, 255, 0.3);
}

.inner-cell[data-index='0'],
.inner-cell[data-index='1'],
.inner-cell[data-index='3'],
.inner-cell[data-index='4'],
.inner-cell[data-index='6'],
.inner-cell[data-index='7'] {
	border-right: 1px solid white;
}

.inner-cell[data-index='0'],
.inner-cell[data-index='1'],
.inner-cell[data-index='2'],
.inner-cell[data-index='3'],
.inner-cell[data-index='4'],
.inner-cell[data-index='5'] {
	border-bottom: 1px solid white;
}
</style>
