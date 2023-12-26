import csv from 'csvtojson';
import { PrismaService } from '../src/common/prisma/prisma.service';

type Organization = {
  organization_code: string;
  organization: string;
  country_code: string;
  accession: string;
  withdrawal: string;
};

const main = async () => {
  const prismaService = new PrismaService();
  const file = './scripts/csv/organizations.csv';
  const organizations: Organization[] = await csv().fromFile(file);
  for (const organization of organizations) {
    const {
      organization_code,
      organization: organization_name,
      country_code,
      accession = '',
      withdrawal = '',
    } = organization;
    console.info(
      `organization_code=${organization_code} country_code=${country_code}`
    );
    const organizationBody = {
      code: organization_code,
      name: organization_name,
    };
    await prismaService.organization.upsert({
      create: organizationBody,
      update: organizationBody,
      where: { code: organization_code },
    });
    const countryBody = {
      organizationCode: organization_code,
      countryCode: country_code,
      accession: accession ? new Date(accession) : undefined,
      withdrawal: withdrawal ? new Date(withdrawal) : undefined,
    };
    await prismaService.countriesOnOrganizations.upsert({
      create: countryBody,
      update: countryBody,
      where: {
        organizationCode_countryCode: {
          organizationCode: organization_code,
          countryCode: country_code,
        },
      },
    });
  }
};

main().catch((error) => console.error(error));
