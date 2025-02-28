import { UiBuilder, uiBuilderElements } from '../UiBuilder'

import cls from './App.module.scss'

export const App = () => {
	return (
		<div className={cls.app}>
			<UiBuilder elements={uiBuilderElements} />
		</div>
	)
}
