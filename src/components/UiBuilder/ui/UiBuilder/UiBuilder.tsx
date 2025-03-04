import { useCallback, useState } from 'react'
import {
	DndContext,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core'

import { Canvas, CanvasElement } from '../Canvas'
import { DragOverlayWrapper } from '../DragOverlayWrapper'
import { Sidebar } from '../Sidebar'
import { TCanvasElementInstance, TElements } from '../../model/types'

import cls from './UiBuilder.module.scss'

interface UiBuilderProps {
	elementsMap: TElements
}

export const UiBuilder = (props: UiBuilderProps) => {
	const { elementsMap } = props

	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			distance: 10,
		},
	})
	const touchSensors = useSensor(TouchSensor, {
		activationConstraint: {
			delay: 300,
			tolerance: 5,
		},
	})

	const sensors = useSensors(mouseSensor, touchSensors)

	const [canvasElements, setCanvasElements] = useState<
		TCanvasElementInstance[]
	>([])
	const [selectedCanvasElement, setSelectedCanvasElement] =
		useState<TCanvasElementInstance | null>(null)

	const addCanvasElement = useCallback(
		(index: number, element: TCanvasElementInstance) => {
			setCanvasElements(prevElements => {
				const newElements = [...prevElements]
				newElements.splice(index, 0, element)

				return newElements
			})
		},
		[]
	)

	const removeCanvasElement = useCallback(
		(id: string) => {
			let canvasElements: TCanvasElementInstance[] = []
			if (id === selectedCanvasElement?.id) {
				setSelectedCanvasElement(null)
			}

			setCanvasElements(prevElements => {
				canvasElements = prevElements.filter(el => el.id !== id)

				return canvasElements
			})

			return canvasElements
		},
		[selectedCanvasElement?.id]
	)

	const selectCanvasElement = useCallback(
		(canvasElement: TCanvasElementInstance | null) => {
			setSelectedCanvasElement(canvasElement)
		},
		[]
	)

	const updateCanvasElementAttributes = useCallback(
		(id: string, attributes: Record<string, any>) => {
			setCanvasElements(prevElements => {
				const newElements = [...prevElements]
				const index = newElements.findIndex(el => el.id === id)
				newElements[index] = {
					...newElements[index],
					attributes: { ...newElements[index].attributes, ...attributes },
				}

				return newElements
			})
		},
		[]
	)

	return (
		<>
			<DndContext sensors={sensors}>
				<div className={cls.builder}>
					<Canvas
						elementsMap={elementsMap}
						canvasElements={canvasElements}
						addCanvasElement={addCanvasElement}
						removeCanvasElement={removeCanvasElement}
						selectCanvasElement={selectCanvasElement}
					/>
					<Sidebar
						elementsMap={elementsMap}
						selectedCanvasElement={selectedCanvasElement}
						updateCanvasElementAttributes={updateCanvasElementAttributes}
					/>
					<DragOverlayWrapper
						elementsMap={elementsMap}
						canvasElements={canvasElements}
					/>
				</div>
			</DndContext>
		</>
	)
}
