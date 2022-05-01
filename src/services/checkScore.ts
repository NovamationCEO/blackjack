export function checkScore(newHand: number[]) {
	const values = newHand.map(item => {
		const value = (item % 13) + 1
		if (value === 1) return 11
		return Math.min(value, 10)
	})
	let result = values.reduce((p, c) => p + c, 0)

	let index = values.findIndex(i => i === 11)
	while (index >= 0 && result > 21) {
		values[index] = 1
		result = values.reduce((p, c) => p + c, 0)
		index = values.findIndex(i => i === 11)
	}
	return result
}
