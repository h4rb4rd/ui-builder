import { UiBuilder, elementsMap } from '../UiBuilder'

import cls from './App.module.scss'

export const App = () => {
	return (
		<div className={cls.app}>
			<UiBuilder elementsMap={elementsMap} />
		</div>
	)
}
