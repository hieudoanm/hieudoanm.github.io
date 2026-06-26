import dynamic from 'next/dynamic';

export const BrailleModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/BrailleModal').then(
      (m) => m.BrailleModal
    ),
  { ssr: false }
);
export const ColorsModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/ColorsModal').then(
      (m) => m.ColorsModal
    ),
  { ssr: false }
);
export const LeetSpeakModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/LeetSpeakModal').then(
      (m) => m.LeetSpeakModal
    ),
  { ssr: false }
);
export const LoremIpsumModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/LoremIpsumModal').then(
      (m) => m.LoremIpsumModal
    ),
  { ssr: false }
);
export const MorseModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/MorseModal').then(
      (m) => m.MorseModal
    ),
  { ssr: false }
);
export const OpenAPI2Postman = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/converters/OpenAPI2Postman').then(
      (m) => m.OpenAPI2Postman
    ),
  { ssr: false }
);
