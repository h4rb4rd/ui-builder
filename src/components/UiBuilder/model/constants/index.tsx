import { InputElement } from '../../ui/Elements/InputElement'
import { TextElement } from '../../ui/Elements/TextElement'
import { TElements } from '../types'

export const uiBuilderElements: TElements = {
	text: {
		type: 'text',
		canvasComponent: <TextElement />,
		sidebarComponent: <span>text</span>,
		createElementInstance: (id: string) => ({
			id,
			type: 'text',
		}),
	},
	input: {
		type: 'input',
		canvasComponent: <InputElement />,
		sidebarComponent: <span>input</span>,
		createElementInstance: (id: string) => ({
			id,
			type: 'input',
		}),
	},
}
