import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.connectMicroservice({
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'default-nestjs-transaction',
          noAck: false,
          queueOptions: {
            durable: true,
          },
        }});

    const config = new DocumentBuilder()
        .setTitle('BankAccount')
        .setDescription('The BankAccountAPI description')
        .setVersion('1.0')
        .addTag('bankAccount')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    app.useGlobalPipes(
        new ValidationPipe({ transform: true, whitelist: true }),
    );
    await app.startAllMicroservices();

    app.enableCors();


    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
