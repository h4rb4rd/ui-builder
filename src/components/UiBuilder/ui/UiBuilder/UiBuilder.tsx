import { useCallback, useState } from 'react'
import {
	DndContext,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core'

import { Canvas } from '../Canvas'
import { DragOverlayWrapper } from '../DragOverlayWrapper'
import { Sidebar } from '../Sidebar'
import { TCanvasElementInstance, TElements } from '../../model/types'

import cls from './UiBuilder.module.scss'

interface UiBuilderProps {
	elements: TElements
}

export const UiBuilder = (props: UiBuilderProps) => {
	const { elements } = props

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

	const removeCanvasElement = useCallback((id: string) => {
		let canvasElements: TCanvasElementInstance[] = []

		setCanvasElements(prevElements => {
			canvasElements = prevElements.filter(el => el.id !== id)

			return canvasElements
		})

		return canvasElements
	}, [])

	return (
		<>
			<DndContext sensors={sensors}>
				<div className={cls.builder}>
					<Canvas
						elements={elements}
						canvasElements={canvasElements}
						addCanvasElement={addCanvasElement}
						removeCanvasElement={removeCanvasElement}
					/>
					<Sidebar elements={elements} />
					<DragOverlayWrapper
						elements={elements}
						canvasElements={canvasElements}
						removeCanvasElement={removeCanvasElement}
					/>
				</div>
			</DndContext>
		</>
	)
}
