import { ReactNode } from 'react'

import { classNames } from '../../../../model/utils'

import cls from './CanvasElement.module.scss'

interface CanvasElementProps {
	children: ReactNode
	overlay?: boolean
}

export const CanvasElement = (props: CanvasElementProps) => {
	const { children, overlay } = props

	const mods = {
		[cls.overlay]: overlay,
	}

	return <div className={classNames(cls.element, [], mods)}>{children}</div>
}
