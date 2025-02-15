import { $Enums } from '@prisma/client';
import { IsString, IsEmail, IsEnum, IsOptional  } from 'class-validator';
import { AccountStatus } from '@prisma/client';

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

    @IsEnum(AccountStatus)
    status: AccountStatus = AccountStatus.ACTIVE; 
}


