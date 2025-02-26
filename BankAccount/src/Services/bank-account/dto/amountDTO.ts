import { IsNotEmpty, IsPositive } from 'class-validator';

export class AmountDTO {
    @IsNotEmpty()
    @IsPositive()
    amount: number | string;
}
