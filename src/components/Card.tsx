import {
	faDiceD20,
	faJedi,
	faMartiniGlassCitrus,
	faStroopwafel,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@mui/material'
import React from 'react'
import '../css/PlayingCard.css'

type myProps = { content: number }

const deckColors = [
	'black',
	'forestgreen',
	'red',
	'brown',
	'purple',
	'darkblue',
]
const icons = [faMartiniGlassCitrus, faDiceD20, faStroopwafel, faJedi]
const letters: { [n: number]: string } = { 0: 'A', 10: 'J', 11: 'Q', 12: 'K' }

export function PlayingCard(props: myProps) {
	const { content } = props

	const deck = Math.floor(content / 52)
	const cardId = content % 52
	const suit = Math.floor(cardId / 13)
	const value = cardId % 13
	const displayValue = letters[value] || value + 1

	return (
		<Box className='playing-card'>
			<Box className='card-border' borderColor={deckColors[deck]}>
				<Box position='absolute' left='5px' top='5px'>
					<FontAwesomeIcon
						icon={icons[suit]}
						size='2x'
						fixedWidth
						color={deckColors[deck]}
					/>
				</Box>
				<Box position='absolute' right='5px' bottom='5px'>
					<FontAwesomeIcon
						icon={icons[suit]}
						size='2x'
						rotation={180}
						fixedWidth
						color={deckColors[deck]}
					/>
				</Box>
				<Box fontSize='60px'>
					<strong>{displayValue}</strong>
				</Box>
			</Box>
		</Box>
	)
}
