'use client';

import { ToolPage } from '@/components/ToolPage';
import { ChessPairing } from '@/components/ChessPairing';

const PairingPage = () => (
  <ToolPage title="Pairing">
    <ChessPairing onClose={() => undefined} />
  </ToolPage>
);

export default PairingPage;
