import { useDraggable } from '@dnd-kit/core'
import { TElement } from '../../../../model/types'

import { classNames } from '../../../../model/utils'

import cls from './SidebarElement.module.scss'

interface SidebarElementProps {
	element: TElement
}

export const SidebarElement = (props: SidebarElementProps) => {
	const { element } = props

	const draggable = useDraggable({
		id: `sidebar-element-${element.type}`,
		data: {
			type: element.type,
			isSidebarElement: true,
		},
	})

	const mods = {
		[cls.isDragging]: draggable.isDragging,
	}

	return (
		<div
			ref={draggable.setNodeRef}
			className={classNames(cls.element, [], mods)}
			{...draggable.listeners}
			{...draggable.attributes}
		>
			{element.sidebarComponent}
		</div>
	)
}
