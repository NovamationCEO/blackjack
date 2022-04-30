import React from 'react'
import { Box, Button, Fade } from '@mui/material'

type myProps = { show: boolean; onClick: () => void; text: string }

export function ActionButton(props: myProps) {
	const { show, onClick, text } = props
	return (
		<Fade in={show}>
			<div>
				<Button variant='contained' onClick={onClick}>
					<Box width='200px' padding='20px'>
						{text}
					</Box>
				</Button>
			</div>
		</Fade>
	)
}
