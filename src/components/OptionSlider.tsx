import { Box, Slider } from '@mui/material'
import React from 'react'

type myProps = {
	value: number
	setValue: (n: number) => void
	min?: number
	max: number
	children: any
}

export function OptionSlider(props: myProps) {
	const { value, setValue, min, max, children } = props

	return (
		<Box margin='10px'>
			<Slider
				value={value}
				onChange={(_e, val) => setValue(Number(val))}
				min={min}
				max={max}
				step={1}
			/>
			<Box marginTop='5px' textAlign='center'>
				{children}
			</Box>
		</Box>
	)
}

OptionSlider.defaultProps = { min: 1 }
