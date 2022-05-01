import { Box, Button, Fade, Slider } from '@mui/material'
import React, { useContext } from 'react'
import { arrayCountTo } from '../services/arrayTools'
import { TableState } from '../services/TableContext'
import { GlassBox } from './GlassBox'
import { OptionSlider } from './OptionSlider'

type myProps = {
	showPlayAgain: boolean
	startGame: (na: number[]) => void
	deckCount: number
	setDeckCount: (n: number) => void
}

export function PlayAgain(props: myProps) {
	const { deckCount, setDeckCount, showPlayAgain, startGame } = props
	const table = useContext(TableState)
	const { bet, setBet } = table

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
					<Button variant='contained' color='primary' onClick={deal}>
						<Box width='135px'>Deal</Box>
					</Button>

					<Box border='1px solid #1976D2' padding='5px' margin='20px 0px 0px 0px'>
						<OptionSlider value={deckCount} setValue={setDeckCount} max={6}>
							Use {deckCount} Deck{deckCount > 1 ? 's' : ''}
						</OptionSlider>

						<OptionSlider value={bet} setValue={setBet} max={10}>
							Bet: {bet}
						</OptionSlider>
					</Box>
				</GlassBox>
			</div>
		</Fade>
	)
}
