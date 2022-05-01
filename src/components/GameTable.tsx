import { Box, Button } from '@mui/material'
import React, { useContext } from 'react'
import { TableState, tableStateType } from '../services/TableContext'
import { ActionButton } from './ActionButton'
import { PlayingCard } from './Card'
import { GlassBox } from './GlassBox'
import { PlayAgain } from './PlayAgain'
import '../css/GameTable.css'
import { checkScore } from '../services/checkScore'

export function GameTable() {
	const [deckCount, setDeckCount] = React.useState(1)
	const [showPlayAgain, setShowPlayAgain] = React.useState(true)
	const [showContinue, setShowContinue] = React.useState(false)
	const [showGameOver, setShowGameOver] = React.useState(false)
	const [playerStand, setPlayerStand] = React.useState(false)
	const [message, setMessage] = React.useState('')
	const table: tableStateType = useContext(TableState)
	const { hand, dealerHand, deck, money, bet } = table

	function loseGame(msg: string) {
		setMessage(msg)
		const newMoney = money - bet
		table.setMoney(newMoney)
		if (newMoney <= 0) {
			setShowGameOver(true)
			return
		}
		setShowContinue(true)
		setPlayerStand(false)
	}

	function winGame(msg: string) {
		setMessage(msg)
		table.setMoney(money + bet)
		setShowContinue(true)
		setPlayerStand(false)
	}

	function clear() {
		table.setHand([])
		table.setDealerHand([])
		setShowPlayAgain(true)
		setShowContinue(false)
		table.setDeck([])
		setPlayerStand(false)
	}

	function hit() {
		const newHand = [...hand]
		const draw = deck.pop() || 0
		newHand.push(draw)
		table.setHand(newHand)
	}

	function dealerHit() {
		const newHand = [...dealerHand]
		const draw = deck.pop() || 0
		newHand.push(draw)
		table.setDealerHand(newHand)
	}

	function stay() {
		setPlayerStand(true)
		dealerHit()
	}

	function startGame(freshDeck: number[]) {
		setShowPlayAgain(false)
		setMessage('')
		table.setDealerHand([freshDeck.pop() || 0])
		table.setHand([freshDeck.pop() || 0, freshDeck.pop() || 0])
		table.setDeck(freshDeck)
	}

	function getLeft(index: number, cardArr: number[]) {
		const total = cardArr.length
		if (total === 1) return '50%'
		const num = 50 - (total / 2 - index) * 15
		return `${num}%`
	}

	React.useEffect(() => {
		const result = checkScore(hand || [])
		if (result > 21) {
			loseGame(`Player Busts - ${result}`)
		}
		if (result === 21) {
			winGame(hand.length === 2 ? 'Blackjack' : 'Player Stands at 21')
		}
		if (hand.length > 4 && result <= 21) {
			winGame('Five-Card Charlie')
		}
	}, [hand])

	React.useEffect(() => {
		if (dealerHand.length <= 1) return
		const result = checkScore(dealerHand || [])
		if (result > 21) {
			winGame(`Dealer Busts - ${result}`)
			return
		}
		if (result >= checkScore(hand || [])) {
			loseGame(`Dealer Wins: ${result} - ${checkScore(hand || [])}`)
			return
		}
		setTimeout(() => dealerHit(), 1000)
	}, [dealerHand])

	function continueBox() {
		if (!showContinue) return null
		return (
			<Box className='show-continue'>
				{message && message.length && (
					<GlassBox margin='10px auto' minWidth='200px'>
						<strong>{message}</strong>
					</GlassBox>
				)}
				<Button variant='contained' onClick={clear}>
					<Box flex={1}>Continue</Box>
				</Button>
			</Box>
		)
	}

	function startNextGame() {
		if (showGameOver) {
			return (
				<Box className='show-continue'>
					<GlassBox minWidth='350px'>
						<Box>You have been eaten by a grue.</Box>
						<Box fontWeight={700}>Game over.</Box>
					</GlassBox>
				</Box>
			)
		}
		return (
			<PlayAgain
				deckCount={deckCount}
				setDeckCount={setDeckCount}
				showPlayAgain={showPlayAgain}
				startGame={startGame}
			/>
		)
	}

	return (
		<Box className='master-container'>
			<Box className='hand-container-invert'>
				{dealerHand.length === 1 && (
					<Box position='absolute' bottom='0px' right='43%'>
						<PlayingCard content={-1} key='dummy' />
					</Box>
				)}
				{dealerHand.map((val, i) => (
					<Box key={`i${val}`} className='card-base' left={getLeft(i, dealerHand)}>
						<PlayingCard content={val} key={val} />
					</Box>
				))}
			</Box>

			<Box position='relative' margin='auto'>
				{continueBox()}
				{startNextGame()}
			</Box>

			<Box className='hand-container'>
				{hand.map((val, i) => (
					<Box key={`i${val}`} className='card-base' left={getLeft(i, hand)}>
						<PlayingCard content={val} key={val} />
					</Box>
				))}
			</Box>

			<GlassBox>
				<Box
					className={
						playerStand || showContinue || money <= 0 ? 'user-bar-off' : 'user-bar-on'
					}
				>
					<Box className='flex-col' fontWeight={700}>
						<Box>MONEY</Box>
						<Box fontSize='25px'>{money}</Box>
					</Box>
					<ActionButton text='Hit' show={!showPlayAgain} onClick={() => hit()} />
					<ActionButton text='Stay' show={!showPlayAgain} onClick={stay} />
				</Box>
			</GlassBox>
		</Box>
	)
}
