import { ComponentType } from 'react';

const loadAngle = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/converter/AngleModal').then(
    (m) => ({ default: m.AngleModal })
  );

const loadBase = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/converter/BaseModal').then(
    (m) => ({ default: m.BaseModal })
  );

const loadCalculator = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/converter/CalculatorModal').then(
    (m) => ({ default: m.CalculatorModal })
  );

const loadData = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/converter/DataModal').then(
    (m) => ({ default: m.DataModal })
  );

const loadLength = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/converter/LengthModal').then(
    (m) => ({ default: m.LengthModal })
  );

const loadRoman = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/converter/RomanModal').then(
    (m) => ({ default: m.RomanModal })
  );

const loadTemperature = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/converter/TemperatureModal').then(
    (m) => ({ default: m.TemperatureModal })
  );

const loadTime = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/converter/TimeModal').then(
    (m) => ({ default: m.TimeModal })
  );

const loadWeight = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/converter/WeightModal').then(
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
