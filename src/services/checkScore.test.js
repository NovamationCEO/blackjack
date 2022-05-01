import { checkScore } from './checkScore.ts'

it('returns simple values from spades', () => {
	expect(checkScore([2, 6])).toEqual(10)
	expect(checkScore([1, 4, 7])).toEqual(15)
	expect(checkScore([9, 3])).toEqual(14)
})

it('sets Ace to 11', () => {
	expect(checkScore([2, 0])).toEqual(14)
	expect(checkScore([0, 4, 4])).toEqual(21)
	expect(checkScore([9, 0])).toEqual(21)
})

it('sets Ace to 1', () => {
	expect(checkScore([2, 0, 5, 3])).toEqual(14)
	expect(checkScore([0, 4, 7])).toEqual(14)
	expect(checkScore([9, 0, 8])).toEqual(20)
})

it('sets one Ace to 1', () => {
	expect(checkScore([0, 0])).toEqual(12)
	expect(checkScore([2, 0, 0])).toEqual(15)
	expect(checkScore([0, 0, 8])).toEqual(21)
})

it('handles multiple Aces correctly', () => {
	expect(checkScore([0, 2, 0, 0])).toEqual(16)
})

it('recognizes face cards', () => {
	expect(checkScore([11])).toEqual(10)
	expect(checkScore([10])).toEqual(10)
	expect(checkScore([12])).toEqual(10)
	expect(checkScore([10, 11, 12])).toEqual(30)
})

it('ignores suits', () => {
	function getRand() {
		return Math.floor(Math.random() * 40) * 13
	}
	const a = getRand()
	const b = getRand()
	const c = getRand()
	const d = getRand()
	expect(checkScore([2 + a, 6 + b])).toEqual(10)
	expect(checkScore([1 + a, 4 + b, 7 + c])).toEqual(15)
	expect(checkScore([9 + a, 3 + b])).toEqual(14)
	expect(checkScore([2 + a, 0 + b])).toEqual(14)
	expect(checkScore([0 + a, 4 + b, 4 + c])).toEqual(21)
	expect(checkScore([9 + a, 0 + b])).toEqual(21)
	expect(checkScore([2 + a, 0 + b, 5 + c, 3 + d])).toEqual(14)
	expect(checkScore([0 + a, 4 + b, 7 + c])).toEqual(14)
	expect(checkScore([9 + a, 0 + b, 8 + c])).toEqual(20)
	expect(checkScore([0 + a, 0 + b])).toEqual(12)
	expect(checkScore([2 + a, 0 + b, 0 + c])).toEqual(15)
	expect(checkScore([0 + a, 0 + b, 8 + c])).toEqual(21)
	expect(checkScore([11 + a])).toEqual(10)
	expect(checkScore([10 + a])).toEqual(10)
	expect(checkScore([12 + a])).toEqual(10)
	expect(checkScore([10 + a, 11 + b, 12 + c])).toEqual(30)
})
