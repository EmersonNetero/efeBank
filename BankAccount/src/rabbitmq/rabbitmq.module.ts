import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'RABBITMQ_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://admin:admin@rabbitmq:5672'],
                    queue: 'default-nestjs-transaction',
                    queueOptions: {
                        durable: false,
                    },
                },
            },
        ]),
    ],
    providers: [RabbitmqService],  // 🔹 Registra RabbitmqServiceasdasd
    exports: [RabbitmqService, ClientsModule], 
})
export class RabbitmqModule {}
