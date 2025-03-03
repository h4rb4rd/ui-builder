import { useDraggable } from '@dnd-kit/core'
import { TElement } from '../../../../model/types'

import { SidebarElement } from '../SidebarElement/SidebarElement'

interface SidebarElementProps {
	element: TElement
}

export const SidebarElementWrapper = (props: SidebarElementProps) => {
	const { element } = props

	const draggable = useDraggable({
		id: `sidebar-element-${element.type}`,
		data: {
			type: element.type,
			isSidebarElement: true,
		},
	})

	return (
		<div
			ref={draggable.setNodeRef}
			{...draggable.listeners}
			{...draggable.attributes}
		>
			<SidebarElement label={element.label} />
		</div>
	)
}
