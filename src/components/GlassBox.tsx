import { Box } from '@mui/material'
import React from 'react'
import '../css/GlassBox.css'

type myProps = {
	children: any
	margin?: string
	minWidth?: string
}

export function GlassBox(props: myProps) {
	const { children, margin, minWidth } = props
	return (
		<Box className='glass-box' margin={margin} minWidth={minWidth}>
			{children}
		</Box>
	)
}

GlassBox.defaultProps = {
	margin: 'default',
	minWidth: 'default',
}
