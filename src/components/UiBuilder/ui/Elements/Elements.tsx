import cls from './Elements.module.scss'

export const InputElement = ({ label }: any) => {
	return (
		<div className={cls.container}>
			<span>{label}</span>
			<input
				className={cls.input}
				type='text'
				placeholder='This is a text input'
			/>
		</div>
	)
}

export const TextareaElement = ({ label }: any) => {
	return (
		<div className={cls.container}>
			<span>{label}</span>
			<textarea className={cls.textarea} rows={5} />
		</div>
	)
}

export const SelectElement = ({ label }: any) => {
	return (
		<div className={cls.container}>
			<span>{label}</span>
			<select className={cls.select}>
				<option value='1'>1</option>
				<option value='2'>2</option>
				<option value='3'>3</option>
			</select>
		</div>
	)
}

export const TextElement = ({ label }: any) => {
	return (
		<div className={cls.container}>
			<span>{label}</span>
			<p className={cls.text}>
				Lorem Ipsum is simply dummy text of the printing and typesetting
				industry. Lorem Ipsum has been the industry's standard dummy text ever
				since the 1500s, when an unknown printer took a galley of type and
				scrambled it to make a type specimen book. It has survived not only five
				centuries, but also the leap into electronic typesetting, remaining
				essentially unchanged. It was popularised in the 1960s with the release
				of Letraset sheets containing Lorem Ipsum passages, and more recently
				with desktop publishing software like Aldus PageMaker including versions
				of Lorem Ipsum.
			</p>
		</div>
	)
}

export const ButtonElement = ({ label }: any) => {
	return (
		<div className={cls.container}>
			<span>{label}</span>
			<button className={cls.button}>Button</button>
		</div>
	)
}
