import { ComponentType } from 'react';

const loadAngle = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/calculator-convert/AngleModal').then(
    (m) => ({ default: m.AngleModal })
  );

const loadBase = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/calculator-convert/BaseModal').then(
    (m) => ({ default: m.BaseModal })
  );

const loadCalculator = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/calculator-convert/CalculatorModal').then(
    (m) => ({ default: m.CalculatorModal })
  );

const loadData = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/calculator-convert/DataModal').then(
    (m) => ({ default: m.DataModal })
  );

const loadLength = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/calculator-convert/LengthModal').then(
    (m) => ({ default: m.LengthModal })
  );

const loadRoman = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/calculator-convert/RomanModal').then(
    (m) => ({ default: m.RomanModal })
  );

const loadTemperature = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/calculator-convert/TemperatureModal').then(
    (m) => ({ default: m.TemperatureModal })
  );

const loadTime = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/calculator-convert/TimeModal').then(
    (m) => ({ default: m.TimeModal })
  );

const loadWeight = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/calculator-convert/WeightModal').then(
    (m) => ({ default: m.WeightModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  angle: loadAngle,
  base: loadBase,
  calculator: loadCalculator,
  data: loadData,
  length: loadLength,
  roman: loadRoman,
  temperature: loadTemperature,
  time: loadTime,
  weight: loadWeight,
};
