export const getBrightness = (hex: string): boolean => {
	let hexCode: string = hex.startsWith('#') ? hex.substring(1) : hex;
	if (hexCode.length === 3) {
		hexCode = `${hexCode[0]}${hexCode[0]}${hexCode[1]}${hexCode[1]}${hexCode[2]}${hexCode[2]}`;
	}
	const rgb: number = parseInt(hexCode, 16);
	const r: number = (rgb >> 16) & 0xff;
	const g: number = (rgb >> 8) & 0xff;
	const b: number = (rgb >> 0) & 0xff;
	const luma: number = 0.299 * r + 0.587 * g + 0.114 * b;
	return luma < 186;
};

export const randomHexColorCode = () => {
	const n = (Math.random() * 0xfffff * 1000000).toString(16);
	return `#${n.slice(0, 6)}`;
};
