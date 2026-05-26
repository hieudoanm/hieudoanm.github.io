import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';
import { FC, useState } from 'react';
import { Angle } from './tabs/math/Angle';
import { Base } from './tabs/math/Base';
import { Data } from './tabs/math/Data';
import { Roman } from './tabs/math/Roman';
import { Length } from './tabs/physical/Length';
import { Temperature } from './tabs/physical/Temperature';
import { Time } from './tabs/physical/Time';
import { Weight } from './tabs/physical/Weight';

enum Measurement {
  Angle = 'angle',
  Base = 'base',
  Data = 'data',
  Length = 'length',
  Roman = 'roman',
  Temperature = 'temperature',
  Time = 'time',
  Weight = 'weight',
}

const TABS: {
  label: string;
  value: Measurement;
  group: 'Math' | 'Physical';
}[] = [
  { label: 'Angle', value: Measurement.Angle, group: 'Math' },
  { label: 'Base', value: Measurement.Base, group: 'Math' },
  { label: 'Roman', value: Measurement.Roman, group: 'Math' },
  { label: 'Data', value: Measurement.Data, group: 'Math' },
  { label: 'Length', value: Measurement.Length, group: 'Physical' },
  { label: 'Weight', value: Measurement.Weight, group: 'Physical' },
  { label: 'Temperature', value: Measurement.Temperature, group: 'Physical' },
  { label: 'Time', value: Measurement.Time, group: 'Physical' },
];

export const ConverterModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [measurement, setMeasurement] = useState<Measurement>(
    Measurement.Angle
  );

  return (
    <ModalWrapper onClose={onClose} title="Converter" size="max-w-lg">
      {/* Math tabs */}
      <p className="mb-1 text-xs font-semibold uppercase opacity-40">Math</p>
      <div role="tablist" className="tabs tabs-boxed mb-2">
        {TABS.filter((t) => t.group === 'Math').map((t) => (
          <a
            key={t.value}
            role="tab"
            className={`tab ${measurement === t.value ? 'tab-active' : ''}`}
            onClick={() => setMeasurement(t.value)}>
            {t.label}
          </a>
        ))}
      </div>

      {/* Physical tabs */}
      <p className="mb-1 text-xs font-semibold uppercase opacity-40">
        Physical
      </p>
      <div role="tablist" className="tabs tabs-boxed mb-4">
        {TABS.filter((t) => t.group === 'Physical').map((t) => (
          <a
            key={t.value}
            role="tab"
            className={`tab ${measurement === t.value ? 'tab-active' : ''}`}
            onClick={() => setMeasurement(t.value)}>
            {t.label}
          </a>
        ))}
      </div>

      {/* Panel */}
      <div className="rounded-box bg-base-200 p-4">
        {measurement === Measurement.Angle && <Angle />}
        {measurement === Measurement.Base && <Base />}
        {measurement === Measurement.Data && <Data />}
        {measurement === Measurement.Length && <Length />}
        {measurement === Measurement.Roman && <Roman />}
        {measurement === Measurement.Temperature && <Temperature />}
        {measurement === Measurement.Time && <Time />}
        {measurement === Measurement.Weight && <Weight />}
      </div>
    </ModalWrapper>
  );
};
