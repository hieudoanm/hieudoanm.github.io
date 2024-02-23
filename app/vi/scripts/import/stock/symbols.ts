import { PrismaClient, Sector } from '@prisma/client';
import axios from 'axios';

const getSymbolsBySector = async (sector: Sector): Promise<string[]> => {
  const codes: Record<Sector, string> = {
    [Sector.BANKING]: '8300',
    [Sector.BASIC_RESOURCES]: '1700',
    [Sector.CHEMICAL]: '1300',
    [Sector.COMMUNICATIONS]: '5500',
    [Sector.ELECTRICITY_WATER_PETROL]: '7500',
    [Sector.FINANCIAL_SERVICES]: '8700',
    [Sector.FOOD_BEVERAGE]: '3500',
    [Sector.INDUSTRIAL_GOODS_SERVICES]: '2700',
    [Sector.INFORMATION_TECHNOLOGY]: '9500',
    [Sector.INSURANCE]: '8500',
    [Sector.MEDICAL]: '4500',
    [Sector.PETROLEUM]: '0500',
    [Sector.REAL_ESTATE]: '8600',
    [Sector.RETAIL]: '5300',
    [Sector.TELECOMMUNICATION]: '6500',
    [Sector.TRAVEL_ENTERTAINMENT]: '5700',
  };
  const code = codes[sector];
  const url = `https://histdatafeed.vps.com.vn/industry/symbols/${code}`;
  const response = await axios.get<{ data: string[] }>(url);
  const { data } = response;
  return data.data.filter((symbol: string) => symbol);
};

const getSymbols = async () => {
  const url = 'https://bgapidatafeed.vps.com.vn/getlistallstock';
  const response = await axios.get(url);
  const { data } = response;
  return data;
};

const getVN30 = async (): Promise<string[]> => {
  const url = 'https://bgapidatafeed.vps.com.vn/listvn30';
  const response = await axios.get<string[]>(url);
  const { data } = response;
  return data;
};

const getHNX30 = async (): Promise<string[]> => {
  const url = 'https://bgapidatafeed.vps.com.vn/getlistckindex/HNX30';
  const response = await axios.get<string[]>(url);
  const { data } = response;
  return data;
};

const getSector = (
  symbol: string,
  {
    banking = [],
    basicResources = [],
    chemical = [],
    communications = [],
    electricityWaterPetrol = [],
    financialServices = [],
    foodBeverage = [],
    industrialGoodsServices = [],
    informationTechnology = [],
    insurance = [],
    medical = [],
    petroleum = [],
    realEstate = [],
    retail = [],
    telecommunication = [],
    travelEntertainment = [],
  }: {
    banking: string[];
    basicResources: string[];
    chemical: string[];
    communications: string[];
    electricityWaterPetrol: string[];
    financialServices: string[];
    foodBeverage: string[];
    industrialGoodsServices: string[];
    informationTechnology: string[];
    insurance: string[];
    medical: string[];
    petroleum: string[];
    realEstate: string[];
    retail: string[];
    telecommunication: string[];
    travelEntertainment: string[];
  }
): Sector | null => {
  if (banking.includes(symbol)) return Sector.BANKING;
  if (basicResources.includes(symbol)) return Sector.BASIC_RESOURCES;
  if (chemical.includes(symbol)) return Sector.CHEMICAL;
  if (communications.includes(symbol)) return Sector.COMMUNICATIONS;
  if (electricityWaterPetrol.includes(symbol))
    return Sector.ELECTRICITY_WATER_PETROL;
  if (financialServices.includes(symbol)) return Sector.FINANCIAL_SERVICES;
  if (foodBeverage.includes(symbol)) return Sector.FOOD_BEVERAGE;
  if (industrialGoodsServices.includes(symbol))
    return Sector.INDUSTRIAL_GOODS_SERVICES;
  if (informationTechnology.includes(symbol))
    return Sector.INFORMATION_TECHNOLOGY;
  if (insurance.includes(symbol)) return Sector.INSURANCE;
  if (medical.includes(symbol)) return Sector.MEDICAL;
  if (petroleum.includes(symbol)) return Sector.PETROLEUM;
  if (realEstate.includes(symbol)) return Sector.REAL_ESTATE;
  if (retail.includes(symbol)) return Sector.RETAIL;
  if (telecommunication.includes(symbol)) return Sector.TELECOMMUNICATION;
  if (travelEntertainment.includes(symbol)) return Sector.TRAVEL_ENTERTAINMENT;
  return null;
};

const importStock = async (prismaClient: PrismaClient) => {
  const vn30: string[] = await getVN30();
  const hnx30: string[] = await getHNX30();
  const banking: string[] = await getSymbolsBySector(Sector.BANKING);
  const basicResources: string[] = await getSymbolsBySector(
    Sector.BASIC_RESOURCES
  );
  const chemical: string[] = await getSymbolsBySector(Sector.CHEMICAL);
  const communications: string[] = await getSymbolsBySector(
    Sector.COMMUNICATIONS
  );
  const electricityWaterPetrol: string[] = await getSymbolsBySector(
    Sector.ELECTRICITY_WATER_PETROL
  );
  const financialServices: string[] = await getSymbolsBySector(
    Sector.FINANCIAL_SERVICES
  );
  const foodBeverage: string[] = await getSymbolsBySector(Sector.FOOD_BEVERAGE);
  const industrialGoodsServices: string[] = await getSymbolsBySector(
    Sector.INDUSTRIAL_GOODS_SERVICES
  );
  const informationTechnology: string[] = await getSymbolsBySector(
    Sector.INFORMATION_TECHNOLOGY
  );
  const insurance: string[] = await getSymbolsBySector(Sector.INSURANCE);
  const medical: string[] = await getSymbolsBySector(Sector.MEDICAL);
  const petroleum: string[] = await getSymbolsBySector(Sector.PETROLEUM);
  const realEstate: string[] = await getSymbolsBySector(Sector.REAL_ESTATE);
  const retail: string[] = await getSymbolsBySector(Sector.RETAIL);
  const telecommunication: string[] = await getSymbolsBySector(
    Sector.TELECOMMUNICATION
  );
  const travelEntertainment: string[] = await getSymbolsBySector(
    Sector.TRAVEL_ENTERTAINMENT
  );
  const symbols = await getSymbols();
  for (const {
    stock_code: symbol,
    name_en: name,
    post_to: market,
  } of symbols) {
    const vn30flag: boolean = vn30.includes(symbol);
    const hnx30flag: boolean = hnx30.includes(symbol);
    if (symbol.length > 3) continue;
    const sector = getSector(symbol, {
      banking,
      basicResources,
      chemical,
      communications,
      electricityWaterPetrol,
      financialServices,
      foodBeverage,
      industrialGoodsServices,
      informationTechnology,
      insurance,
      medical,
      petroleum,
      realEstate,
      retail,
      telecommunication,
      travelEntertainment,
    });
    console.info('stock', {
      symbol,
      market,
      sector,
      vn30: vn30flag,
      hnx30: hnx30flag,
      name,
    });
    const body = {
      symbol,
      name,
      market,
      sector,
      vn30: vn30flag,
      hnx30: hnx30flag,
    };
    await prismaClient.stockSymbol.upsert({
      create: body,
      update: body,
      where: { symbol },
    });
  }
};

const main = async () => {
  const prismaClient = new PrismaClient();
  await importStock(prismaClient);
  process.exit(0);
};

main();
