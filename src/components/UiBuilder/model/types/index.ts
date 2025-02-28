import { JSX } from 'react'

export type TCanvasElementInstance = {
	id: string
	type: string
	extraAttributes?: Record<string, any>
}

export type TElement = {
	type: string
	canvasComponent: JSX.Element
	sidebarComponent: JSX.Element
	createElementInstance: (id: string) => TCanvasElementInstance
}

export type TElements = {
	[key in string]: TElement
}
