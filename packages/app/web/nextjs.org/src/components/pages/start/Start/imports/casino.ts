import dynamic from 'next/dynamic';

export const BlackjackModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/casino/BlackjackModal').then(
      (m) => m.BlackjackModal
    ),
  { ssr: false }
);
export const PokerModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/casino/PokerModal').then(
      (m) => m.PokerModal
    ),
  { ssr: false }
);
