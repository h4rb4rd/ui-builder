import { InputElement } from '../../ui/Elements/InputElement'
import { TextElement } from '../../ui/Elements/TextElement'
import { TElements } from '../types'

export const elementsMap: TElements = {
	text: {
		type: 'text',
		label: 'text',
		component: <TextElement />,
	},
	input: {
		type: 'input',
		label: 'input',
		component: <InputElement />,
	},
}
