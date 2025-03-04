import {
	ButtonElement,
	InputElement,
	SelectElement,
	TextareaElement,
	TextElement,
} from '../../ui/Elements/Elements'
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
	textarea: {
		type: 'textarea',
		label: 'textarea',
		component: <TextareaElement />,
	},
	select: {
		type: 'select',
		label: 'select',
		component: <SelectElement />,
	},
	button: {
		type: 'button',
		label: 'button',
		component: <ButtonElement />,
	},
}
