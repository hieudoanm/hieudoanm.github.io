export const chunk = <T>(array: T[], perChunk: number) => {
  const resultArray: T[][] = [];
  for (let index = 0; index < array.length; index += perChunk) {
    const chunkArray: T[] = array.slice(index, index + perChunk);
    resultArray.push(chunkArray);
  }
  return resultArray;
};
