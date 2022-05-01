import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { PlayAgain } from './PlayAgain.tsx'
import { arrayCountTo } from '../services/arrayTools'

const noop = () => null
const startFunc = jest.fn(x => x)

it('renders PlayAgain', () => {
	render(
		<PlayAgain showPlayAgain startGame={noop} deckCount={1} setDeckCount={noop} />
	)
	expect(screen.getByText('Deal')).toBeInTheDocument()
})

it('does not render PlayAgain', () => {
	render(<PlayAgain startGame={noop} deckCount={1} setDeckCount={noop} />)
	expect(screen.getByText('Deal')).toBeInTheDocument()
})

it('starts game', () => {
	render(
		<PlayAgain
			showPlayAgain
			startGame={startFunc}
			deckCount={1}
			setDeckCount={noop}
		/>
	)
	fireEvent.click(screen.getByText('Deal'))
	expect(startFunc.mock.calls.length).toBe(1)
})

it('shuffles', () => {
	render(
		<PlayAgain
			showPlayAgain
			startGame={startFunc}
			deckCount={2}
			setDeckCount={noop}
		/>
	)
	fireEvent.click(screen.getByText('Deal'))
	fireEvent.click(screen.getByText('Deal'))
	fireEvent.click(screen.getByText('Deal'))

	const a = startFunc.mock.calls[0][0]
	const b = startFunc.mock.calls[1][0]
	const c = startFunc.mock.calls[2][0]
	const d = arrayCountTo(104)
	expect(a).not.toEqual(b)
	expect(b).not.toEqual(c)
	expect(c).not.toEqual(a)
	expect(a).not.toEqual(d)
	expect(b).not.toEqual(d)
	expect(c).not.toEqual(d)
})
