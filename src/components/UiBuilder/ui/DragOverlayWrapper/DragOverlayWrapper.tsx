import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import { useState } from 'react'

import { SidebarElement } from '../Sidebar/ui/SidebarElement/SidebarElement'
import { TCanvasElementInstance, TElements } from '../../model/types'
import { CanvasElement } from '../Canvas/ui/CanvasElement/CanvasElement'

interface DragOverlayWrapperProps {
	elements: TElements
	canvasElements: TCanvasElementInstance[]
	removeCanvasElement: (id: string) => TCanvasElementInstance[]
}

export const DragOverlayWrapper = (props: DragOverlayWrapperProps) => {
	const { elements, canvasElements, removeCanvasElement } = props

	const [draggedItem, setDraggedItem] = useState<Active | null>(null)

	useDndMonitor({
		onDragStart: event => setDraggedItem(event.active),
		onDragCancel: () => setDraggedItem(null),
		onDragEnd: () => setDraggedItem(null),
	})

	if (!draggedItem) return null

	const isSidebarElement = draggedItem?.data?.current?.isSidebarElement
	const isCanvasElement = draggedItem?.data?.current?.isCanvasElement
	const type = draggedItem?.data?.current?.type
	const id = draggedItem?.data?.current?.id

	let node = null

	if (isSidebarElement) {
		node = <SidebarElement element={elements[type]} />
	}

	if (isCanvasElement) {
		const element = canvasElements.find(el => el.id === id)
		if (!element) return

		node = (
			<div style={{ pointerEvents: 'none' }}>
				<CanvasElement
					element={element}
					elements={elements}
					removeCanvasElement={removeCanvasElement}
				/>
			</div>
		)
	}

	return <DragOverlay>{node}</DragOverlay>
}
