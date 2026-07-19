import { Buffer } from 'node:buffer';
globalThis.Buffer = Buffer;

import { KeyPair, mnemonicToPrivateKey } from '@ton/crypto';
import {
  Address,
  Cell,
  TonClient,
  WalletContractV4,
  beginCell,
  internal,
  toNano,
} from '@ton/ton';
import {
  TonConnectUIProvider,
  useTonConnectUI,
  useTonWallet,
} from '@tonconnect/ui-react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

// ── SERVER-SIDE TON CLIENT ──

const TON_ENDPOINT_MAINNET = 'https://toncenter.com/api/v2/jsonRPC';
const TON_ENDPOINT_TESTNET = 'https://testnet.toncenter.com/api/v2/jsonRPC';

const NODE_ENV: 'development' | 'production' | 'test' =
  (process.env.NODE_ENV as 'development' | 'production' | 'test') ??
  'development';
const TON_ENDPOINT =
  NODE_ENV === 'development' ? TON_ENDPOINT_TESTNET : TON_ENDPOINT_MAINNET;
const USDT_JETTON_ADDRESS = process.env.USDT_JETTON_ADDRESS as string;
const MNEMONIC = (process.env.TON_WALLET_MNEMONIC ?? '').split(' ');

export const tonClient = new TonClient({ endpoint: TON_ENDPOINT });

let keyPair: KeyPair | null = null;
let serverWallet: WalletContractV4 | null = null;

const initWallet = async (): Promise<void> => {
  if (!keyPair) {
    keyPair = await mnemonicToPrivateKey(MNEMONIC);
    serverWallet = WalletContractV4.create({
      workchain: 0,
      publicKey: keyPair.publicKey,
    });
  }
};

const buildJettonTransfer = ({
  to,
  amount,
}: {
  to: string;
  amount: bigint;
}): Cell =>
  beginCell()
    .storeUint(0xf8a7ea5, 32)
    .storeUint(0, 64)
    .storeCoins(amount)
    .storeAddress(Address.parse(to))
    .storeAddress(Address.parse(to))
    .storeBit(0)
    .storeCoins(toNano('0.05'))
    .storeBit(0)
    .endCell();

export const transfer = async ({
  address,
  amount = 0,
}: {
  address: string;
  amount: number;
}): Promise<void> => {
  await initWallet();
  if (!serverWallet || !keyPair) {
    throw new Error('Failed to initialize server wallet');
  }

  const serverWalletContract = tonClient.open(serverWallet);
  const seqno = await serverWalletContract.getSeqno();
  const payload = buildJettonTransfer({ to: address, amount: toNano(amount) });

  await serverWalletContract.sendTransfer({
    seqno,
    secretKey: keyPair.secretKey,
    messages: [
      internal({
        to: Address.parse(USDT_JETTON_ADDRESS),
        value: toNano('0.1'),
        body: payload,
      }),
    ],
  });
};

// ── CLIENT-SIDE WALLET CONTEXT ──

interface TonWalletContextProps {
  balance: bigint;
  address: string;
  shortAddress: string | null;
  wallet: ReturnType<typeof useTonWallet>;
  connect: () => void;
  disconnect: () => void;
}

const TonWalletContext = createContext<TonWalletContextProps | undefined>(
  undefined
);

const TonWalletInner = ({ children }: { children: ReactNode }) => {
  const [{ balance }, setState] = useState<{ balance: bigint }>({
    balance: BigInt(0),
  });
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  const address: string = wallet?.account.address ?? '';
  const shortAddress = wallet?.account.address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null;

  useEffect(() => {
    if (!address) return;

    const fetchBalance = async () => {
      const addressClass = Address.parse(address);
      const bal = await tonClient.getBalance(addressClass);
      setState((prev) => ({ ...prev, balance: bal }));
    };

    fetchBalance();
  }, [address]);

  const connect = useCallback(() => {
    if (!wallet) tonConnectUI.openModal();
  }, [wallet, tonConnectUI]);

  const disconnect = useCallback(() => {
    if (wallet) tonConnectUI.disconnect();
  }, [wallet, tonConnectUI]);

  const value = useMemo(
    () => ({ balance, address, shortAddress, wallet, connect, disconnect }),
    [balance, address, shortAddress, wallet, connect, disconnect]
  );

  return (
    <TonWalletContext.Provider value={value}>
      {children}
    </TonWalletContext.Provider>
  );
};

export const TonWalletProvider = ({
  children,
  manifestUrl,
}: {
  children: ReactNode;
  manifestUrl?: string;
}) => (
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <TonWalletInner>{children}</TonWalletInner>
  </TonConnectUIProvider>
);

export const useTonWalletContext = () => {
  const context = useContext(TonWalletContext);
  if (!context)
    throw new Error(
      'useTonWalletContext must be used within a TonWalletProvider'
    );
  return context;
};
