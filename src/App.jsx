import React from 'react'
import './App.css'
import { GameTable } from './components/GameTable'
import { TableContext } from './services/TableContext'

function App() {
	return (
		<div className='table'>
			<TableContext>
				<GameTable />
			</TableContext>
		</div>
	)
}

export default App
