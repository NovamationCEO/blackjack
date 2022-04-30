import { Box, Button } from '@mui/material'
import React from 'react'
import { ActionButton } from './ActionButton'
import { PlayingCard } from './Card'
import { GlassBox } from './GlassBox'
import { PlayAgain } from './PlayAgain'

type myProps = {}

export function GameTable(props: myProps) {
	const {} = props
	const [deck, setDeck] = React.useState([] as number[])
	const [bet, setBet] = React.useState(3)
	const [money, setMoney] = React.useState(25)
	const [deckCount, setDeckCount] = React.useState(1)
	const [showPlayAgain, setShowPlayAgain] = React.useState(true)
	const [hand, setHand] = React.useState([] as number[])
	const [showContinue, setShowContinue] = React.useState(false)
	const [dealerHand, setDealerHand] = React.useState([] as number[])

	function kickedOut() {}

	function loseGame() {
		setMoney(money - bet)
		if (money <= 0) {
			kickedOut()
		}
		setShowContinue(true)
	}

	function winGame() {
		setMoney(money + bet)
		setShowContinue(true)
	}

	function checkScore(newHand: number[]) {
		const values = newHand.map(item => {
			const value = (item % 13) + 1
			if (value === 1) return 11
			return Math.min(value, 10)
		})
		const result = values.reduce((p, c) => p + c, 0)

		let index = values.findIndex(i => i === 11)
		while (index > 0 && result > 21) {
			values[index] = 1
			index = values.findIndex(i => i === 11)
		}
		if (result > 21) {
			loseGame()
		}
		if (result === 21 || (hand.length > 4 && result <= 21)) {
			winGame()
		}
	}

	function clear() {
		setHand([])
		setShowPlayAgain(true)
		setShowContinue(false)
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
		const draw = freshDeck.pop()
		if (!draw) return
		setDealerHand([draw])
		setDeck(freshDeck)
	}

	function getLeft(index: number) {
		const total = hand.length
		if (total === 1) return '50%'

		const num = 50 - (total / 2 - index) * 15
		return `${num}%`
	}

	React.useEffect(() => {
		checkScore(hand || [])
	}, [hand])

	return (
		<Box
			display='flex'
			flex={1}
			flexDirection='column'
			justifyContent='space-between'
			padding='20px'
		>
			<Box flex={1} position='relative' style={{ transform: 'rotate(180deg)' }}>
				{dealerHand.map((val, i) => (
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
			{showContinue && (
				<Box margin='auto'>
					<Button variant='contained' onClick={clear}>
						Continue
					</Button>
				</Box>
			)}
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
				<Box
					display='grid'
					gridTemplateColumns='1fr 1fr 1fr'
					style={{
						pointerEvents: showContinue || money <= 0 ? 'none' : 'auto',
						opacity: showContinue || money <= 0 ? 0.2 : 1,
						transition: '1s ease opacity',
					}}
				>
					<Box
						display='flex'
						flexDirection='column'
						alignItems='center'
						justifyContent='center'
						fontWeight={700}
					>
						<Box>MONEY</Box>
						<Box>{money}</Box>
					</Box>
					<ActionButton text='Hit' show={!showPlayAgain} onClick={hit} />
					<ActionButton text='Stay' show={!showPlayAgain} onClick={stay} />
				</Box>
			</GlassBox>
		</Box>
	)
}
