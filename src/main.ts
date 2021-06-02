import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            // Ignores no declared parameters from request body and takes the declared ones
            whitelist: true,
            // Shows an error if there are parameters not declared on request body
            forbidNonWhitelisted: true,
        }),
    );
    await app.listen(3000);
}
bootstrap();
