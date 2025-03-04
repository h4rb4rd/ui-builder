import { SidebarElementWrapper } from '../SidebarElementWrapper/SidebarElementWrapper'
import { TCanvasElementInstance, TElements } from '../../../../model/types'

import cls from './Sidebar.module.scss'
import { uuid } from '../../../../model/utils'

interface SidebarProps {
	elementsMap: TElements
	selectedCanvasElement: TCanvasElementInstance | null
	updateCanvasElementAttributes: (
		id: string,
		attributes: Record<string, any>
	) => void
}

export const Sidebar = (props: SidebarProps) => {
	const { elementsMap, selectedCanvasElement, updateCanvasElementAttributes } =
		props

	const elementsList = Object.values(elementsMap)?.map(el => (
		<SidebarElementWrapper key={el.type} element={el} />
	))

	const properties = (
		<div className={cls.attributes}>
			selected element - {selectedCanvasElement?.type}
			<button
				className={cls.btn}
				onClick={() => {
					if (selectedCanvasElement)
						updateCanvasElementAttributes(selectedCanvasElement.id, {
							label: uuid(),
						})
				}}
			>
				update attributes
			</button>
		</div>
	)

	return (
		<div className={cls.sidebar}>
			{selectedCanvasElement ? properties : elementsList}
		</div>
	)
}
