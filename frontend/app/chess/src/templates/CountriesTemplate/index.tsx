import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { CountriesMaps } from './components/CountriesMaps';
import { CountriesTable } from './components/CountriesTable';

export type Country = { countryCode: string; count: number };

export type CountriesTemplateProperties = {
  countries: Country[];
};

export const CountriesTemplate: React.FC<CountriesTemplateProperties> = ({
  countries = [],
}) => {
  return (
    <div className="py-4 md:py-8">
      <Tabs isFitted variant="soft-rounded" colorScheme="teal">
        <TabList>
          <Tab>Maps</Tab>
          <Tab>List</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CountriesMaps countries={countries} />
          </TabPanel>
          <TabPanel>
            <CountriesTable countries={countries} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};
