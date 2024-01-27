
import {UnitedStatesCongressMembersInCongressesDto} from './unitedStatesCongressMembersInCongresses.entity'
import {UnitedStatesCongressCommitteeDto} from './unitedStatesCongressCommittee.entity'
import {UnitedStatesCongressDto} from './unitedStatesCongress.entity'


export class UnitedStatesCongressMemberDto {
  id: string ;
firstName: string  | null;
middleName: string  | null;
lastName: string  | null;
suffix: string  | null;
dateOfBirth: Date  | null;
gender: string  | null;
createdAt: Date  | null;
updatedAt: Date  | null;
UnitedStatesCongressMembersInCongresses?: UnitedStatesCongressMembersInCongressesDto[] ;
committees?: UnitedStatesCongressCommitteeDto[] ;
UnitedStatesCongress?: UnitedStatesCongressDto  | null;
unitedStatesCongressCongress: number  | null;
}
