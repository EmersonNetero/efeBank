import { IsString, IsDecimal, IsNotEmpty } from 'class-validator';

export class TransactionDTO {
  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsDecimal()
  @IsNotEmpty()
  amount: string;

  @IsString()
  @IsNotEmpty()
  counterpartyBankCode: string;

  @IsString()
  @IsNotEmpty()
  counterpartyBankName: string;
}
