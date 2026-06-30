import {
  MS_PER_DAY,
  MS_PER_HOUR,
  MS_PER_MINUTE,
  MS_PER_MONTH_AVG,
  MS_PER_SECOND,
  MS_PER_WEEK,
  MS_PER_YEAR_AVG,
  TimeUnit,
} from './constants';

export const convertTime = (
  fromAmount: number,
  fromUnit: TimeUnit,
  toUnit: TimeUnit
): number | string => {
  let millisecondsValue: number;

  if (fromUnit === 'milliseconds') {
    millisecondsValue = fromAmount;
  } else if (fromUnit === 'seconds') {
    millisecondsValue = fromAmount * MS_PER_SECOND;
  } else if (fromUnit === 'minutes') {
    millisecondsValue = fromAmount * MS_PER_MINUTE;
  } else if (fromUnit === 'hours') {
    millisecondsValue = fromAmount * MS_PER_HOUR;
  } else if (fromUnit === 'days') {
    millisecondsValue = fromAmount * MS_PER_DAY;
  } else if (fromUnit === 'weeks') {
    millisecondsValue = fromAmount * MS_PER_WEEK;
  } else if (fromUnit === 'months') {
    millisecondsValue = fromAmount * MS_PER_MONTH_AVG;
  } else if (fromUnit === 'years') {
    millisecondsValue = fromAmount * MS_PER_YEAR_AVG;
  } else if (fromUnit === 'date') {
    millisecondsValue = fromAmount;
  } else {
    millisecondsValue = fromAmount;
  }

  if (toUnit === 'milliseconds') {
    return parseFloat(millisecondsValue.toFixed(0));
  } else if (toUnit === 'seconds') {
    return parseFloat((millisecondsValue / MS_PER_SECOND).toFixed(3));
  } else if (toUnit === 'minutes') {
    return parseFloat((millisecondsValue / MS_PER_MINUTE).toFixed(5));
  } else if (toUnit === 'hours') {
    return parseFloat((millisecondsValue / MS_PER_HOUR).toFixed(5));
  } else if (toUnit === 'days') {
    return parseFloat((millisecondsValue / MS_PER_DAY).toFixed(5));
  } else if (toUnit === 'weeks') {
    return parseFloat((millisecondsValue / MS_PER_WEEK).toFixed(5));
  } else if (toUnit === 'months') {
    return parseFloat((millisecondsValue / MS_PER_MONTH_AVG).toFixed(5));
  } else if (toUnit === 'years') {
    return parseFloat((millisecondsValue / MS_PER_YEAR_AVG).toFixed(5));
  } else if (toUnit === 'date') {
    const date = new Date(millisecondsValue);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return date.toLocaleString();
  } else {
    return parseFloat(millisecondsValue.toFixed(0));
  }
};
