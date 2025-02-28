import { useState } from 'react'
import { useDraggable, useDroppable } from '@dnd-kit/core'

import { classNames } from '../../../../model/utils'
import { TCanvasElementInstance, TElements } from '../../../../model/types'

import cls from './CanvasElement.module.scss'

interface CanvasElementProps {
	element: TCanvasElementInstance
	elements: TElements
	removeCanvasElement: (id: string) => TCanvasElementInstance[]
}

export const CanvasElement = (props: CanvasElementProps) => {
	const { element, elements, removeCanvasElement } = props

	const [isMouseOver, setIsMouseOver] = useState(false)

	const draggable = useDraggable({
		id: element.id + '-drag-handler',
		data: {
			type: element.type,
			id: element.id,
			isCanvasElement: true,
		},
	})

	const topHalf = useDroppable({
		id: element.id + '-top',
		data: { type: element.type, id: element.id, isTopHalf: true },
	})

	const bottomHalf = useDroppable({
		id: element.id + '-bottom',
		data: { type: element.type, id: element.id, isBottomHalf: true },
	})

	const canvasComponent = elements[element.type].canvasComponent

	const mods = {
		[cls.isMouseOver]: isMouseOver,
	}

	if (draggable.isDragging) {
		return null
	}

	return (
		<div
			ref={draggable.setNodeRef}
			className={classNames(cls.container, [], mods)}
			onMouseEnter={() => setIsMouseOver(true)}
			onMouseLeave={() => setIsMouseOver(false)}
			{...draggable.listeners}
			{...draggable.attributes}
		>
			{isMouseOver && (
				<div className={cls.overlay}>
					<p className={cls.text}>click for properties or drag to move</p>
					<button
						className={cls.btn}
						onClick={() => removeCanvasElement(element.id)}
					>
						delete
					</button>
				</div>
			)}
			{topHalf.isOver && <div className={cls.topDrop} />}
			<div ref={topHalf.setNodeRef} className={cls.top} />
			<div className={cls.element}>{canvasComponent}</div>
			<div ref={bottomHalf.setNodeRef} className={cls.bottom} />
			{bottomHalf.isOver && <div className={cls.bottomDrop} />}
		</div>
	)
}
