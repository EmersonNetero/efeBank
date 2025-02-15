import { $Enums } from '@prisma/client';
import { IsString, IsEmail, IsEnum } from 'class-validator';

export class BankAccountDTO {
    @IsString()
    branch: string;
    number: string;

    @IsEnum($Enums.AccountType)
    type: $Enums.AccountType;

    @IsString()
    holderName: string;

    @IsEmail()
    holderEmail: string;
    @IsString()
    holderDocument: string;

    @IsEnum($Enums.HolderType)
    holderType: $Enums.HolderType;

    @IsEnum($Enums.AccountStatus)
    status: $Enums.AccountStatus;
}
