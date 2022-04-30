import { Box, Button, Fade, Slider } from '@mui/material'
import React from 'react'
import { arrayCountTo } from '../services/arrayTools'
import { ActionButton } from './ActionButton'
import { PlayingCard } from './Card'
import { GlassBox } from './GlassBox'
import { PlayAgain } from './PlayAgain'

type myProps = {}

export function GameTable(props: myProps) {
	const {} = props
	const [deck, setDeck] = React.useState([] as number[])
	const [bet, setBet] = React.useState(3)
	const [money, setMoney] = React.useState(50)
	const [deckCount, setDeckCount] = React.useState(1)
	const [showPlayAgain, setShowPlayAgain] = React.useState(true)
	const [hand, setHand] = React.useState([] as number[])

	function clear() {
		setHand([])
		setShowPlayAgain(true)
		setDeck([])
	}

	function hit() {
		const draw = deck.pop()
		const newHand = [...hand]
		newHand.push(draw || -1)
		setHand(newHand)
	}

	function stay() {
		clear()
	}

	function startGame(freshDeck: number[]) {
		setShowPlayAgain(false)
		setDeck(freshDeck)
	}

	function getLeft(index: number) {
		const total = hand.length
		if (total === 1) return '50%'

		const num = 50 - (total / 2 - index) * 15
		return `${num}%`
	}

	return (
		<Box
			display='flex'
			flex={1}
			flexDirection='column'
			justifyContent='space-between'
			padding='20px'
		>
			<Box flex={1}>Dealer</Box>
			<Box margin='auto'>
				<PlayAgain
					deckCount={deckCount}
					setDeckCount={setDeckCount}
					showPlayAgain={showPlayAgain}
					startGame={startGame}
					setDeck={setDeck}
					bet={bet}
					setBet={setBet}
				/>
			</Box>
			<Box flex={1} position='relative'>
				{hand.map((val, i) => (
					<Box
						key={`i${val}`}
						position='absolute'
						bottom='20px'
						left={getLeft(i)}
						style={{ transition: '1s ease all' }}
					>
						<PlayingCard content={val} key={val} />
					</Box>
				))}
			</Box>

			<GlassBox>
				<Box display='grid' gridTemplateColumns='1fr 1fr 1fr'>
					<Box>{money}</Box>
					<ActionButton text='Hit' show={!showPlayAgain} onClick={hit} />
					<ActionButton text='Stay' show={!showPlayAgain} onClick={stay} />
				</Box>
			</GlassBox>
		</Box>
	)
}
