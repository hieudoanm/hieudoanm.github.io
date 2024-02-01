import { APP_NAME } from '@sunil/common/constants/app.constants';
import { HofstedeTemplate } from '@sunil/shared/templates/HofstedeTemplate';
import { NextPage } from 'next';
import Head from 'next/head';

const HofstedePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>{APP_NAME} - Hofstede</title>
      </Head>
      <HofstedeTemplate />
    </>
  );
};

export default HofstedePage;
