import { getCoins, Tag } from '@web/clients/coinranking/coinranking.client';
import { Coin } from '@web/clients/coinranking/coinranking.dto';
import { useIsOnline } from '@web/hooks/use-is-online';
import { CryptoQuery, CryptoTemplate } from '@web/router/apps/crypto';
import { GetStaticProps, NextPage } from 'next';

const CryptoPage: NextPage<{ coins: Coin[] }> = ({ coins = [] }) => {
  const isOnline = useIsOnline();

  if (!isOnline) {
    return <CryptoTemplate coins={coins} />;
  }

  return <CryptoQuery tag={Tag.LAYER_1} />;
};

export const getStaticProps: GetStaticProps<{
  coins: Coin[];
}> = async () => {
  try {
    const {
      data: { coins = [] },
    } = await getCoins({ tag: Tag.LAYER_1 });
    return { props: { coins } };
  } catch {
    return { props: { coins: [] } };
  }
};

export default CryptoPage;
