import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core'

import { classNames, uuid } from '../../../../model/utils'
import { CanvasElement } from '../CanvasElement/CanvasElement'
import { TCanvasElementInstance, TElements } from '../../../../model/types'

import cls from './Canvas.module.scss'

interface CanvasProps {
	elements: TElements
	canvasElements: TCanvasElementInstance[]
	addCanvasElement: (index: number, element: TCanvasElementInstance) => void
	removeCanvasElement: (id: string) => TCanvasElementInstance[]
}

export const Canvas = (props: CanvasProps) => {
	const { elements, canvasElements, addCanvasElement, removeCanvasElement } =
		props

	const droppable = useDroppable({
		id: 'canvas-drop-area',
		data: {
			isCanvasDropArea: true,
		},
	})

	useDndMonitor({
		onDragEnd: (event: DragEndEvent) => {
			const { active, over } = event

			if (!active || !over) return

			const isSidebarElement = active?.data?.current?.isSidebarElement
			const isCanvasElement = active?.data?.current?.isCanvasElement
			const isCanvasDropArea = over?.data?.current?.isCanvasDropArea
			const isTopHalfDropArea = over?.data?.current?.isTopHalf
			const isBottomHalfDropArea = over?.data?.current?.isBottomHalf
			const type = active?.data?.current?.type
			const overId = over?.data?.current?.id
			const activeId = active?.data?.current?.id

			// handle first drop from sidebar to canvas
			if (isSidebarElement && isCanvasDropArea) {
				const id = uuid()

				const newElement = elements[type].createElementInstance(id)

				if (!newElement) return

				addCanvasElement(canvasElements.length, newElement)

				return
			}

			// handle drop over elements from sidebar
			if (isSidebarElement && (isTopHalfDropArea || isBottomHalfDropArea)) {
				const id = uuid()

				const newElement = elements[type].createElementInstance(id)

				if (!newElement) return

				const overElementIndex = canvasElements.findIndex(
					el => el.id === overId
				)

				if (overElementIndex === -1) {
					console.log('element not found')
				}

				let indexForNewElement = overElementIndex

				if (isBottomHalfDropArea) {
					indexForNewElement += 1
				}

				addCanvasElement(indexForNewElement, newElement)

				return
			}

			// handle drop over elements from canvas
			if (isCanvasElement && (isTopHalfDropArea || isBottomHalfDropArea)) {
				const activeElementIndex = canvasElements.findIndex(
					el => el.id === activeId
				)

				// save active element
				const activeElement = { ...canvasElements[activeElementIndex] }

				// remove from elements on drag
				const overElementIndex = removeCanvasElement(activeId).findIndex(
					el => el.id === overId
				)

				if (activeElementIndex === -1 || overElementIndex === -1) {
					console.log('element not found')
				}

				let indexForNewElement = overElementIndex

				if (isBottomHalfDropArea) {
					indexForNewElement += 1
				}

				// past active element into new place by index
				addCanvasElement(indexForNewElement, activeElement)
			}
		},
	})

	const mods = {
		[cls.isOver]: droppable.isOver,
	}

	return (
		<div
			ref={droppable.setNodeRef}
			className={classNames(cls.canvas, [], mods)}
		>
			{!canvasElements.length && droppable.isOver && (
				<div className={cls.spacer} />
			)}
			{!droppable.isOver && !canvasElements.length && <p>drop here</p>}
			{canvasElements.length ? (
				<div className={cls.elements}>
					{canvasElements.map(el => (
						<CanvasElement
							key={el.id}
							element={el}
							elements={elements}
							removeCanvasElement={removeCanvasElement}
						/>
					))}
				</div>
			) : null}
		</div>
	)
}
