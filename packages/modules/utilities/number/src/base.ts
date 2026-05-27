export const base = (number: number) => {
  return {
    from: (fromBase: number) => {
      const decimal = parseInt(number.toString(), fromBase);
      return {
        to: (toBase: number): string => {
          if (isNaN(decimal)) {
            return 'Invalid number or base';
          }
          return decimal.toString(toBase).toUpperCase();
        },
      };
    },
  };
};
