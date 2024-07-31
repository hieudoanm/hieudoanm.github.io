import { GridTemplate } from '@web/router/apps/Apps';
import { NextPage } from 'next';

const CountriesApps: NextPage = () => {
  return <GridTemplate folder='usa' />;
};

export default CountriesApps;
