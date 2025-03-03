import { classNames } from '../../../../model/utils'

import cls from './SidebarElement.module.scss'

interface SidebarElementProps {
	label: string
	overlay?: boolean
}

export const SidebarElement = (props: SidebarElementProps) => {
	const { label, overlay } = props

	const mods = {
		[cls.overlay]: overlay,
	}

	return <div className={classNames(cls.element, [], mods)}>{label}</div>
}
