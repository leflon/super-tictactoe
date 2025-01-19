import type { Grid } from './Grid';

export default class Game {
	board: Grid[];
	superBoard: ('X' | 'O' | 'tie' | null)[];
	currentPlayer: 'X' | 'O';
	lastMove: [number, number] | null;
	constructor() {
		this.board = Array(9)
			.fill(null)
			.map(() => Array(9).fill(null));
		this.superBoard = Array(9).fill(null);
		this.currentPlayer = 'X';
		this.lastMove = null;
	}
	reset() {
		this.board = Array(9)
			.fill(null)
			.map(() => Array(9).fill(null));
		this.superBoard = Array(9).fill(null);
		this.currentPlayer = 'X';
		this.lastMove = null;
	}
	move(grid: number, cell: number) {
		if (this.superBoard[grid] || this.board[grid][cell]) {
			return false;
		}

		this.board[grid][cell] = this.currentPlayer;
		this.lastMove = [grid, cell];
		const outcome = this.checkInnerOutcome(grid);
		if (outcome !== null) {
			this.superBoard[grid] = outcome;
		}

		this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
		return true;
	}

	getNextGrid() {
		if (this.lastMove === null) return null;
		if (this.superBoard[this.lastMove[1]]) return null;
		if (this.checkInnerOutcome(this.lastMove[1]) !== null) return null;
		return this.lastMove[1];
	}

	checkInnerOutcome(grid: number) {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (const line of lines) {
			const [a, b, c] = line;
			if (
				this.board[grid][a] &&
				this.board[grid][a] === this.board[grid][b] &&
				this.board[grid][a] === this.board[grid][c]
			) {
				return this.board[grid][a];
			}
		}

		if (this.board[grid].every((cell) => cell)) return 'tie';
		return null;
	}

	checkOutcome() {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (const line of lines) {
			const [a, b, c] = line;
			if (
				this.superBoard[a] &&
				this.superBoard[a] === this.superBoard[b] &&
				this.superBoard[a] === this.superBoard[c]
			) {
				return this.superBoard[a];
			}
		}
		return null;
	}
}
