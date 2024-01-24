
import {ProgrammingLanguageType} from '@prisma/client'


export class ProgrammingLanguageDto {
  language: string ;
color: string  | null;
type: ProgrammingLanguageType ;
extensions: string[] ;
aliases: string[] ;
interpreters: string[] ;
filenames: string[] ;
createdAt: Date  | null;
updatedAt: Date  | null;
}
