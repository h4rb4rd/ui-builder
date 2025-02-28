export type Mods = Record<string, boolean | string | undefined>

export function classNames(
	cls: string,
	additional: Array<string | undefined> = [],
	mods: Mods = {}
): string {
	const filteredAdditional = additional.filter(Boolean)
	const filteredMods = Object.entries(mods)
		.filter(([className, value]) => Boolean(value))
		.map(([className]) => className)

	return [cls, ...filteredAdditional, ...filteredMods].join(' ')
}

export const uuid = () => {
	const hashTable = [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'0',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
	]
	const uuid = []

	for (let i = 0; i < 36; i++) {
		if (i === 8 || i === 13 || i === 18 || i === 23) {
			uuid[i] = '-'
		} else {
			uuid[i] = hashTable[Math.ceil(Math.random() * hashTable.length - 1)]
		}
	}
	return uuid.join('')
}
