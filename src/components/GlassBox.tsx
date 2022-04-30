import { Box } from '@mui/material'
import React from 'react'
import '../css/GlassBox.css'

type myProps = {
	children: any
}

export function GlassBox(props: myProps) {
	const { children } = props
	return <Box className='glass-box'>{children}</Box>
}
