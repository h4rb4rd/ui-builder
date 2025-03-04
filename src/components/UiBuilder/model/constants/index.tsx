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
		Component: props => <TextElement {...props} />,
	},
	input: {
		type: 'input',
		label: 'input',
		Component: props => <InputElement {...props} />,
	},
	textarea: {
		type: 'textarea',
		label: 'textarea',
		Component: props => <TextareaElement {...props} />,
	},
	select: {
		type: 'select',
		label: 'select',
		Component: props => <SelectElement {...props} />,
	},
	button: {
		type: 'button',
		label: 'button',
		Component: props => <ButtonElement {...props} />,
	},
}
