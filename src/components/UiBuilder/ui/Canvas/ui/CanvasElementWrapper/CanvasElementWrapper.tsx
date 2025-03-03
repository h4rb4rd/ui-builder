import { useDraggable, useDroppable } from '@dnd-kit/core'
import { CanvasElement } from '../CanvasElement/CanvasElement'
import { TCanvasElementInstance, TElements } from '../../../../model/types'

import cls from './CanvasElementWrapper.module.scss'

interface CanvasElementProps {
	canvasElement: TCanvasElementInstance
	elementsMap: TElements
	removeCanvasElement: (id: string) => TCanvasElementInstance[]
}

export const CanvasElementWrapper = (props: CanvasElementProps) => {
	const { canvasElement, elementsMap, removeCanvasElement } = props

	const draggable = useDraggable({
		id: canvasElement.id + '-drag-handler',
		data: {
			type: canvasElement.type,
			id: canvasElement.id,
			isCanvasElement: true,
		},
	})

	const topHalf = useDroppable({
		id: canvasElement.id + '-top',
		data: { type: canvasElement.type, id: canvasElement.id, isTopHalf: true },
	})

	const bottomHalf = useDroppable({
		id: canvasElement.id + '-bottom',
		data: {
			type: canvasElement.type,
			id: canvasElement.id,
			isBottomHalf: true,
		},
	})

	const overlay = (
		<div className={cls.overlay}>
			<p className={cls.text}>click for properties or drag to move</p>
			<button
				className={cls.btn}
				onClick={() => removeCanvasElement(canvasElement.id)}
			>
				delete
			</button>
		</div>
	)

	const component = elementsMap[canvasElement.type].component

	if (draggable.isDragging) {
		return null
	}

	return (
		<div
			ref={draggable.setNodeRef}
			className={cls.container}
			{...draggable.listeners}
			{...draggable.attributes}
		>
			{overlay}
			{topHalf.isOver && <div className={cls.topDrop} />}
			<div ref={topHalf.setNodeRef} className={cls.top} />
			<CanvasElement>{component}</CanvasElement>
			<div ref={bottomHalf.setNodeRef} className={cls.bottom} />
			{bottomHalf.isOver && <div className={cls.bottomDrop} />}
		</div>
	)
}
