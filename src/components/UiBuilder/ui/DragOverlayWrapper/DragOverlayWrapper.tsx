import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import { useState } from 'react'

import { CanvasElement } from '../Canvas'
import { SidebarElement } from '../Sidebar/ui/SidebarElement/SidebarElement'
import { TCanvasElementInstance, TElements } from '../../model/types'

interface DragOverlayWrapperProps {
	elementsMap: TElements
	canvasElements: TCanvasElementInstance[]
}

export const DragOverlayWrapper = (props: DragOverlayWrapperProps) => {
	const { elementsMap, canvasElements } = props

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
		node = <SidebarElement label={elementsMap[type].label} overlay />
	}

	if (isCanvasElement) {
		const canvasElement = canvasElements.find(el => el.id === id)

		if (!canvasElement) return

		const component = elementsMap[canvasElement.type].component

		node = <CanvasElement overlay>{component}</CanvasElement>
	}

	return <DragOverlay>{node}</DragOverlay>
}
