import React from 'react'

type myProps = { children: any }

export interface tableStateType {
	deck: number[]
	setDeck: (na: number[]) => void
	hand: number[]
	setHand: (na: number[]) => void
	dealerHand: number[]
	setDealerHand: (na: number[]) => void
	money: number
	setMoney: (n: number) => void
}

export const TableState = React.createContext({
	deck: [],
	setDeck: (na: number[]) => null,
	hand: [],
	setHand: (na: number[]) => null,
	dealerHand: [],
	setDealerHand: (na: number[]) => null,
	money: 50,
	setMoney: (n: number) => null,
} as tableStateType)

const freshTableState = {
	deck: [] as number[],
	hand: [] as number[],
	dealerHand: [] as number[],
	money: 5,
}

export function TableContext(props: myProps) {
	const { children } = props

	const [deck, setDeck] = React.useState(freshTableState.deck)
	const [hand, setHand] = React.useState(freshTableState.hand)
	const [dealerHand, setDealerHand] = React.useState(freshTableState.dealerHand)
	const [money, setMoney] = React.useState(freshTableState.money)

	return (
		<TableState.Provider
			value={
				{
					deck,
					setDeck,
					hand,
					setHand,
					dealerHand,
					setDealerHand,
					money,
					setMoney,
				} as tableStateType
			}
		>
			{children}
		</TableState.Provider>
	)
}
