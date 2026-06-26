import dynamic from 'next/dynamic';

export const CalculatorModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/CalculatorModal').then(
      (m) => m.CalculatorModal
    ),
  { ssr: false }
);
export const ConverterModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/ConverterModal').then(
      (m) => m.ConverterModal
    ),
  { ssr: false }
);
export const EloModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/EloModal').then(
      (m) => m.EloModal
    ),
  { ssr: false }
);
export const InflationModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/InflationModal').then(
      (m) => m.InflationModal
    ),
  { ssr: false }
);
export const TaxModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/TaxModal').then(
      (m) => m.TaxModal
    ),
  { ssr: false }
);
export const SplitBillModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/SplitBillModal').then(
      (m) => m.SplitBillModal
    ),
  { ssr: false }
);
export const DaysCountModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/calculators/DaysCountModal').then(
      (m) => m.DaysCountModal
    ),
  { ssr: false }
);
