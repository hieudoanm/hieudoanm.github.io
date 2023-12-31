import { UnitedStatesCongressDto } from './unitedStatesCongress.entity';
import { UnitedStatesCongressMembersInCongressesDto } from './unitedStatesCongressMembersInCongresses.entity';
import { UnitedStatesCongressCommitteeDto } from './unitedStatesCongressCommittee.entity';

export class UnitedStatesCongressMemberDto {
  id: string;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  suffix: string | null;
  dateOfBirth: Date | null;
  gender: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  UnitedStatesCongress?: UnitedStatesCongressDto | null;
  unitedStatesCongressCongress: number | null;
  UnitedStatesCongressMembersInCongresses?: UnitedStatesCongressMembersInCongressesDto[];
  committees?: UnitedStatesCongressCommitteeDto[];
}
