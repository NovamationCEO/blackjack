import React from 'react'
import { render } from '@testing-library/react'
import { GameTable } from './GameTable.tsx'

// it('loses', () => {
// 	const wrapper = render(<GameTable />)

// 	// wrapper.loseGame = loseGameFunc
// 	wrapper.money = 100
// 	wrapper.bet = 5
// 	wrapper.loseGame('BOOGER')
// 	// expect(loseGameFunc.mock.calls[0][0]).toBe('BOOGER')
// 	expect(wrapper.money).toEqual(95)
// })

// it('starts game', () => {
// 	render(
// 		<PlayAgain
// 			showPlayAgain
// 			startGame={startFunc}
// 			deckCount={1}
// 			setDeckCount={noop}
// 		/>
// 	)
// 	fireEvent.click(screen.getByText('Deal'))
// 	expect(startFunc.mock.calls.length).toBe(1)
// })

// it('shuffles', () => {
// 	render(
// 		<PlayAgain
// 			showPlayAgain
// 			startGame={startFunc}
// 			deckCount={2}
// 			setDeckCount={noop}
// 		/>
// 	)
// 	fireEvent.click(screen.getByText('Deal'))
// 	fireEvent.click(screen.getByText('Deal'))
// 	fireEvent.click(screen.getByText('Deal'))

// 	const a = startFunc.mock.calls[0][0]
// 	const b = startFunc.mock.calls[1][0]
// 	const c = startFunc.mock.calls[2][0]
// 	const d = arrayCountTo(104)
// 	expect(a).not.toEqual(b)
// 	expect(b).not.toEqual(c)
// 	expect(c).not.toEqual(a)
// 	expect(a).not.toEqual(d)
// 	expect(b).not.toEqual(d)
// 	expect(c).not.toEqual(d)
// })
