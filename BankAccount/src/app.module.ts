import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankAccountService } from './Services/bank-account/bank-account.service';
import { BankAccountController } from './controllers/bank-account/bank-account.controller';
import { PrismaService } from './Database/prisma.service';
import { TransactionController } from './controllers/transaction/transaction.controller';
import { TransactionService } from './Services/transaction/transaction.service';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
    imports: [ClientsModule.register([
        {
          name: 'TRANSACTION_SERVICE',
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://admin:admin@localhost:5672'],
            queue: 'default-nestjs-transaction',
            queueOptions: {
              durable: true,
            },
          },
        },
      ]),],
    controllers: [AppController, BankAccountController, TransactionController],
    providers: [
        AppService,
        BankAccountService,
        PrismaService, 
        TransactionService
    ],
})
export class AppModule {}
