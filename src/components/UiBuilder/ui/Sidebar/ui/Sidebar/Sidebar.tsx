import { SidebarElement } from '../SidebarElement/SidebarElement'
import { TElements } from '../../../../model/types'

import cls from './Sidebar.module.scss'

interface SidebarProps {
	elements: TElements
}

export const Sidebar = (props: SidebarProps) => {
	const { elements } = props

	return (
		<div className={cls.sidebar}>
			{elements
				? Object.values(elements).map(el => (
						<SidebarElement key={el.type} element={el} />
				  ))
				: null}
		</div>
	)
}
