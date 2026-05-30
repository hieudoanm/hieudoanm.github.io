import { render, screen, waitFor } from '@testing-library/react';
import {
  TonWalletProvider,
  tonClient,
  transfer,
  useTonWalletContext,
} from '../TonWalletContext';
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';

jest.mock('@ton/ton', () => ({
  TonClient: jest.fn().mockImplementation(() => ({
    open: jest.fn().mockReturnValue({
      getSeqno: jest.fn().mockResolvedValue(1),
      sendTransfer: jest.fn().mockResolvedValue(undefined),
    }),
    getBalance: jest.fn().mockResolvedValue(BigInt(0)),
  })),
  Address: { parse: jest.fn().mockReturnValue('parsed-address') },
  Cell: jest.fn(),
  WalletContractV4: { create: jest.fn().mockReturnValue('mock-wallet') },
  beginCell: jest.fn().mockReturnValue({
    storeUint: jest.fn().mockReturnThis(),
    storeCoins: jest.fn().mockReturnThis(),
    storeAddress: jest.fn().mockReturnThis(),
    storeBit: jest.fn().mockReturnThis(),
    endCell: jest.fn().mockReturnValue('mock-cell'),
  }),
  internal: jest.fn().mockReturnValue('mock-internal'),
  toNano: jest.fn().mockReturnValue(BigInt(100000000)),
}));

jest.mock('@ton/crypto', () => ({
  mnemonicToPrivateKey: jest.fn().mockResolvedValue({
    publicKey: Buffer.from('public-key'),
    secretKey: Buffer.from('secret-key'),
  }),
}));

jest.mock('@tonconnect/ui-react', () => ({
  TonConnectUIProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useTonConnectUI: jest.fn(),
  useTonWallet: jest.fn(),
}));

describe('TonWalletContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .mocked(useTonConnectUI)
      .mockReturnValue([{ openModal: jest.fn(), disconnect: jest.fn() }]);
    jest.mocked(useTonWallet).mockReturnValue(null);
  });

  describe('module exports', () => {
    it('exports a tonClient instance', () => {
      expect(tonClient).toBeDefined();
    });

    it('exports transfer as a function', () => {
      expect(typeof transfer).toBe('function');
    });
  });

  describe('transfer', () => {
    it('resolves when wallet initializes', async () => {
      await expect(
        transfer({ address: 'EQD...', amount: 10 })
      ).resolves.toBeUndefined();
    });
  });

  describe('TonWalletProvider', () => {
    it('renders children', () => {
      render(
        <TonWalletProvider>
          <div data-testid="child">Hello</div>
        </TonWalletProvider>
      );
      expect(screen.getByTestId('child')).toHaveTextContent('Hello');
    });
  });

  describe('useTonWalletContext', () => {
    it('throws when used outside provider', () => {
      expect(() => render(<ThrowsOnMount />)).toThrow(
        'useTonWalletContext must be used within a TonWalletProvider'
      );
    });

    it('returns default values when wallet is disconnected', () => {
      render(
        <TonWalletProvider>
          <ContextConsumer />
        </TonWalletProvider>
      );
      expect(screen.getByTestId('balance')).toHaveTextContent('0');
      expect(screen.getByTestId('address')).toHaveTextContent('');
      expect(screen.getByTestId('short-address')).toHaveTextContent('');
    });

    it('computes shortAddress when wallet is connected', async () => {
      jest.mocked(useTonWallet).mockReturnValue({
        account: { address: 'EQCx1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t' },
      } as any);

      render(
        <TonWalletProvider>
          <ContextConsumer />
        </TonWalletProvider>
      );
      await waitFor(() => {
        expect(screen.getByTestId('short-address')).toHaveTextContent(
          'EQCx1a...9s0t'
        );
      });
    });

    it('provides connect function that opens modal when no wallet', () => {
      const mockOpenModal = jest.fn();
      jest
        .mocked(useTonConnectUI)
        .mockReturnValue([{ openModal: mockOpenModal, disconnect: jest.fn() }]);
      jest.mocked(useTonWallet).mockReturnValue(null);

      let capturedConnect!: () => void;
      render(
        <TonWalletProvider>
          <Capture
            fn={(ctx) => {
              capturedConnect = ctx.connect;
            }}
          />
        </TonWalletProvider>
      );
      capturedConnect();

      expect(mockOpenModal).toHaveBeenCalledTimes(1);
    });

    it('does nothing on connect when wallet already exists', async () => {
      const mockOpenModal = jest.fn();
      jest
        .mocked(useTonConnectUI)
        .mockReturnValue([{ openModal: mockOpenModal, disconnect: jest.fn() }]);
      jest
        .mocked(useTonWallet)
        .mockReturnValue({ account: { address: 'EQC...' } } as any);

      let capturedConnect!: () => void;
      render(
        <TonWalletProvider>
          <Capture
            fn={(ctx) => {
              capturedConnect = ctx.connect;
            }}
          />
        </TonWalletProvider>
      );
      await waitFor(() => {
        capturedConnect();
        expect(mockOpenModal).not.toHaveBeenCalled();
      });
    });

    it('provides disconnect function that calls tonConnectUI.disconnect when wallet exists', async () => {
      const mockDisconnect = jest.fn();
      jest
        .mocked(useTonConnectUI)
        .mockReturnValue([
          { openModal: jest.fn(), disconnect: mockDisconnect },
        ]);
      jest
        .mocked(useTonWallet)
        .mockReturnValue({ account: { address: 'EQC...' } } as any);

      let capturedDisconnect!: () => void;
      render(
        <TonWalletProvider>
          <Capture
            fn={(ctx) => {
              capturedDisconnect = ctx.disconnect;
            }}
          />
        </TonWalletProvider>
      );
      await waitFor(() => {
        capturedDisconnect();
        expect(mockDisconnect).toHaveBeenCalledTimes(1);
      });
    });

    it('does nothing on disconnect when no wallet', () => {
      const mockDisconnect = jest.fn();
      jest
        .mocked(useTonConnectUI)
        .mockReturnValue([
          { openModal: jest.fn(), disconnect: mockDisconnect },
        ]);
      jest.mocked(useTonWallet).mockReturnValue(null);

      let capturedDisconnect!: () => void;
      render(
        <TonWalletProvider>
          <Capture
            fn={(ctx) => {
              capturedDisconnect = ctx.disconnect;
            }}
          />
        </TonWalletProvider>
      );
      capturedDisconnect();

      expect(mockDisconnect).not.toHaveBeenCalled();
    });
  });
});

function ThrowsOnMount() {
  useTonWalletContext();
  return null;
}

function ContextConsumer() {
  const ctx = useTonWalletContext();
  return (
    <div>
      <span data-testid="balance">{String(ctx.balance)}</span>
      <span data-testid="address">{ctx.address}</span>
      <span data-testid="short-address">{ctx.shortAddress ?? ''}</span>
    </div>
  );
}

function Capture({
  fn,
}: {
  fn: (ctx: ReturnType<typeof useTonWalletContext>) => void;
}) {
  const ctx = useTonWalletContext();
  fn(ctx);
  return null;
}
