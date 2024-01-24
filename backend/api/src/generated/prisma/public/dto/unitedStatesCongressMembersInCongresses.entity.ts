import { UnitedStatesCongressChamber } from '@hieudoanm/generated/prisma/public/client';
import { UnitedStatesCongressDto } from './unitedStatesCongress.entity';
import { UnitedStatesCongressMemberDto } from './unitedStatesCongressMember.entity';

export class UnitedStatesCongressMembersInCongressesDto {
  chamber: UnitedStatesCongressChamber;
  congress?: UnitedStatesCongressDto;
  congressNumber: number;
  member?: UnitedStatesCongressMemberDto;
  memberId: string;
  title: string | null;
  shortTitle: string | null;
  party: string | null;
  leadershipRole: string | null;
  seniority: number | null;
  state: string | null;
  district: string | null;
  atLarge: boolean | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
