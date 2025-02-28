import cls from './Elements.module.scss'

export const InputElement = () => {
	return (
		<div className={cls.container}>
			<input className={cls.input} type='text' />
		</div>
	)
}
