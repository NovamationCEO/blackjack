import { Box, Button, Fade, Slider } from '@mui/material'
import React from 'react'
import { arrayCountTo } from '../services/arrayTools'
import { GlassBox } from './GlassBox'
import { OptionSlider } from './OptionSlider'

type myProps = {
	showPlayAgain: boolean
	startGame: (na: number[]) => void
	deckCount: number
	setDeckCount: (n: number) => void
	setDeck: (na: number[]) => void
	bet: number
	setBet: (n: number) => void
}

export function PlayAgain(props: myProps) {
	const {
		deckCount,
		setDeckCount,
		showPlayAgain,
		startGame,
		setDeck,
		bet,
		setBet,
	} = props
	const [showSlider, setShowSlider] = React.useState(false)

	function deal() {
		const freshDecks = arrayCountTo(52 * deckCount)
		for (let i = freshDecks.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			const temp = freshDecks[i]
			freshDecks[i] = freshDecks[j]
			freshDecks[j] = temp
		}
		startGame(freshDecks)
	}

	return (
		<Fade in={showPlayAgain}>
			<div>
				<GlassBox>
					<Box display='grid' gap='20px' gridTemplateColumns='1fr 1fr'>
						<Button variant='contained' color='primary' onClick={deal}>
							Deal
						</Button>
						<Button
							variant='contained'
							color='primary'
							onClick={() => setShowSlider(prev => !prev)}
						>
							Decks
						</Button>
					</Box>
					{showSlider && (
						<OptionSlider value={deckCount} setValue={setDeckCount} max={6}>
							Use {deckCount} Deck{deckCount > 1 ? 's' : ''}
						</OptionSlider>
					)}
					{!showSlider && (
						<OptionSlider value={bet} setValue={setBet} max={10}>
							Bet: {bet}
						</OptionSlider>
					)}
				</GlassBox>
			</div>
		</Fade>
	)
}
