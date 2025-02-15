import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UpdateEmailDTO {
    @ApiProperty({
        example: 'exemplo@dominio.com',
    })
    @IsEmail({}, { message: 'Email inválido' })
    email: string;
}
