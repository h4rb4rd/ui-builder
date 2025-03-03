import { SidebarElementWrapper } from '../SidebarElementWrapper/SidebarElementWrapper'
import { TElements } from '../../../../model/types'

import cls from './Sidebar.module.scss'

interface SidebarProps {
	elementsMap: TElements
}

export const Sidebar = (props: SidebarProps) => {
	const { elementsMap } = props

	return (
		<div className={cls.sidebar}>
			{Object.values(elementsMap)?.map(el => (
				<SidebarElementWrapper key={el.type} element={el} />
			))}
		</div>
	)
}
