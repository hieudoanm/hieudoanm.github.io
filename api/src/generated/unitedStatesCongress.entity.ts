import { UnitedStatesCongressMemberDto } from './unitedStatesCongressMember.entity';
import { UnitedStatesCongressCommitteeDto } from './unitedStatesCongressCommittee.entity';
import { UnitedStatesCongressMembersInCongressesDto } from './unitedStatesCongressMembersInCongresses.entity';

export class UnitedStatesCongressDto {
  congress: number;
  houseControl: string | null;
  senateControl: string | null;
  congressControl: string | null;
  trifectaControl: string | null;
  startDate: Date | null;
  endDate: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  UnitedStatesCongressMember?: UnitedStatesCongressMemberDto[];
  UnitedStatesCongressCommittee?: UnitedStatesCongressCommitteeDto[];
  UnitedStatesCongressMembersInCongresses?: UnitedStatesCongressMembersInCongressesDto[];
}
