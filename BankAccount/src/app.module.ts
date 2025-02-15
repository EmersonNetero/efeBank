import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankAccountService } from './Services/bank-account/bank-account.service';
import { BankAccountController } from './controllers/bank-account/bank-account.controller';
import { PrismaService } from './Database/prisma.service';

@Module({
    imports: [],
    controllers: [AppController, BankAccountController],
    providers: [AppService, BankAccountService, PrismaService],
})
export class AppModule {}
