import { UnitedStatesCongressChamber } from '@prisma/client';
import axios from 'axios';
import csv from 'csvtojson';
import dotenv from 'dotenv';
import { PrismaService } from '../../../api/src/common/prisma/prisma.service';

const BASE_URL = 'https://api.propublica.org/congress/v1';
const CHAMBERS = ['house', 'senate'];
const START = 80;
const END = 118;

dotenv.config();

const API_KEY_PROPUBLICA_CONGRESS: string =
  process.env.API_KEY_PROPUBLICA_CONGRESS || '';
const headers = { 'X-API-Key': API_KEY_PROPUBLICA_CONGRESS };

const importCongress = async (prismaService: PrismaService) => {
  const file = './scripts/csv/united-states/congress.csv';
  const congress = await csv().fromFile(file);
  for (const {
    number,
    house_control: houseControl,
    senate_control: senateControl,
    congress_control: congressControl,
    trifecta_control: trifectaControl,
    start_date: startDate,
    end_date: endDate,
  } of congress) {
    const body = {
      congress: parseInt(number, 10),
      houseControl,
      senateControl,
      congressControl,
      trifectaControl,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    };
    await prismaService.unitedStatesCongress.upsert({
      create: body,
      update: body,
      where: { congress: parseInt(number, 10) },
    });
  }
};

const importMembers = async (
  prismaService: PrismaService,
  congressNumber: number,
  chamber: string
) => {
  const url: string = `${BASE_URL}/${congressNumber}/${chamber}/members`;
  console.info(`url=${url}`);
  const response = await axios.get(url, { headers });
  const { data = { results: [] } } = response;
  const { results = [] } = data;
  for (const result of results) {
    const { members } = result;
    for (const member of members) {
      const {
        id,
        title,
        short_title: shortTitle = '',
        first_name: firstName = '',
        middle_name: middleName = '',
        last_name: lastName = '',
        suffix = '',
        date_of_birth: dateOfBirth = '',
        gender = '',
        party = '',
        leadership_role: leadershipRole = '',
        seniority = 0,
        state = '',
        district = '',
        at_large: atLarge = false,
      } = member;
      const uniqueMember = {
        id,
        firstName,
        middleName,
        lastName,
        suffix,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        gender,
      };
      const congressMember = {
        chamber: chamber.toUpperCase() as UnitedStatesCongressChamber,
        congressNumber,
        memberId: id,
        title,
        shortTitle,
        party,
        leadershipRole,
        seniority: parseInt(seniority, 10),
        state,
        district,
        atLarge,
      };
      await prismaService.unitedStatesCongressMember.upsert({
        create: uniqueMember,
        update: uniqueMember,
        where: {
          id,
        },
      });
      await prismaService.unitedStatesCongressMembersInCongresses.upsert({
        create: congressMember,
        update: congressMember,
        where: {
          chamber_congressNumber_memberId: {
            congressNumber,
            chamber: chamber.toUpperCase() as UnitedStatesCongressChamber,
            memberId: id,
          },
        },
      });
    }
  }
};

const importCommittees = async (
  prismaService: PrismaService,
  congressNumber: number,
  chamber: string
) => {
  const url: string = `${BASE_URL}/${congressNumber}/${chamber}/committees`;
  console.info(`url=${url}`);
  const response = await axios.get(url, { headers });
  const { data = { results: [] } } = response;
  const { results = [] } = data;
  for (const result of results) {
    const { committees } = result;
    for (const committee of committees) {
      const { id, name, chair_id: chairId = '' } = committee;
      const body = {
        congressNumber,
        chamber: chamber.toUpperCase() as UnitedStatesCongressChamber,
        id,
        name,
        chairId,
      };
      try {
        await prismaService.unitedStatesCongressCommittee.upsert({
          create: body,
          update: body,
          where: {
            congressNumber_chamber_id: {
              congressNumber,
              chamber: chamber.toUpperCase() as UnitedStatesCongressChamber,
              id,
            },
          },
        });
      } catch (error) {
        console.error(
          `congressNumber=${congressNumber} chamber=${chamber} id=${id} name=${name} chairId=${chairId} error`
        );
      }
    }
  }
};

const main = async () => {
  const prismaService = new PrismaService();
  await importCongress(prismaService);
  for (const chamber of CHAMBERS) {
    for (let congress = END; congress >= START; congress--) {
      importMembers(prismaService, congress, chamber);
      importCommittees(prismaService, congress, chamber);
    }
  }
};

main();
