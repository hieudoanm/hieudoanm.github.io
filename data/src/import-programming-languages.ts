import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { writeFileSync } from 'fs';
import { parse } from 'yaml';

const getLanguages = async () => {
  const url =
    'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml';
  const response = await axios.get<string>(url);
  const { data } = response;
  writeFileSync('./scripts/yaml/languages.yaml', data);
  const languagesMap = parse(data);
  const languages = Object.keys(languagesMap).map((key) => {
    const language = languagesMap[key];
    return { ...language, language: key };
  });
  return languages;
};

const main = async () => {
  const prismaService = new PrismaClient();
  const languages = await getLanguages();
  console.info('languages', languages);
  for (const {
    language,
    type = '',
    color = '',
    aliases = [],
    filenames = [],
    extensions = [],
    interpreters = [],
  } of languages) {
    const body = {
      language,
      type: type.toUpperCase(),
      color,
      aliases,
      filenames,
      extensions,
      interpreters,
    };
    await prismaService.programmingLanguage.upsert({
      create: body,
      update: body,
      where: { language },
    });
  }
};

main();
