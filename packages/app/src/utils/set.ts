export const isSubset = <T>(setA: Set<T>, setB: Set<T>) => {
	for (const elem of setB) {
		if (!setA.has(elem)) {
			return false;
		}
	}
	return true;
};
