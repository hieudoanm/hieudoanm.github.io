
import {UnitedStatesCongressChamber} from '@prisma/client'
import {UnitedStatesCongressDto} from './unitedStatesCongress.entity'
import {UnitedStatesCongressMemberDto} from './unitedStatesCongressMember.entity'


export class UnitedStatesCongressCommitteeDto {
  chamber: UnitedStatesCongressChamber ;
congress?: UnitedStatesCongressDto ;
congressNumber: number ;
id: string ;
name: string  | null;
chair?: UnitedStatesCongressMemberDto  | null;
chairId: string  | null;
createdAt: Date  | null;
updatedAt: Date  | null;
}
