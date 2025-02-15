import { ApiProperty } from '@nestjs/swagger';
import { AccountStatus } from '@prisma/client';

export class UpdateStatusDTO {
  @ApiProperty({
    enum: AccountStatus,
    description: 'Status da conta bancária',
    enumName: 'AccountStatus',
  })
  status: AccountStatus;
}
