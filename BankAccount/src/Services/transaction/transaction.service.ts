import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

// import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';

@Injectable()
export class TransactionService {
    constructor(@Inject('TRANSACTION_SERVICE') private client: ClientProxy) {

    }

    async crediteTransaction() {
        try {
            this.client.emit('default-nestjs-transaction', {
              id: `${Math.random() * 100}}`,
              data: {
                amount: Math.random() * 100,
              },
            });
       
            return {
              message: 'Creditado',
            };
          } catch (error) {
            console.log(error);
          }
        }
}
