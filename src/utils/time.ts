export const getOrdinalSuffix = (weekday: number): string => {
  const j = weekday % 10;
  const k = weekday % 100;

  if (j === 1 && k !== 11) {
    return 'st';
  }
  if (j === 2 && k !== 12) {
    return 'nd';
  }
  if (j === 3 && k !== 13) {
    return 'rd';
  }
  return 'th';
};

export const getNumberOfDaysPerMonth = (year: number): number[] => {
  return [
    31, // January
    new Date(year, 1, 29).getMonth() === 1 ? 29 : 28, // February
    31, // March
    30, // April
    31, // May
    30, // June
    31, // July
    31, // August
    30, // September
    31, // October
    30, // November
    31, // December
  ];
};
