import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';

@Injectable()
export class RabbitmqService {
    // constructor(
    //     @Inject('RABBITMQ_SERVICE') public readonly clientMQ: ClientRMQ,
    // ) {}
}
