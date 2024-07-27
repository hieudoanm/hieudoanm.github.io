import { writeFileSync } from 'node:fs';

const main = async () => {
  const url = 'https://restcountries.com/v3.1/all';
  const response = await fetch(url);
  const countries = await response.json();
  countries.sort((a: { cca2: string }, b: { cca2: string }) =>
    a.cca2 > b.cca2 ? 1 : -1
  );
  writeFileSync(
    './src/json/countries.json',
    JSON.stringify(countries, null, 2)
  );
};

main().catch(console.error);
