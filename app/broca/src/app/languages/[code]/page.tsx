import { get } from '@broca/common/clients/http';
import { BASE_URL } from '@broca/common/environments/environments';
import { LanguageTemplate } from '@broca/templates/LanguageTemplate';
import { Language } from '@prisma/client';
import { NextPage } from 'next';

type LanguagePageProperties = {
  params: { code: string };
};

const LanguagePage: NextPage<LanguagePageProperties> = async ({
  params: { code },
}) => {
  const url = `${BASE_URL}/api/languages/${code}`;
  const language = await get<Language>(url);

  return <LanguageTemplate language={language} />;
};

export default LanguagePage;
