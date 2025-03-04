import { JSX } from 'react'

export type TCanvasElementInstance = {
	id: string
	type: string
	attributes?: Record<string, any>
}

export type TElement = {
	type: string
	label: string
	Component: (props: any) => JSX.Element
}

export type TElements = {
	[key in string]: TElement
}
