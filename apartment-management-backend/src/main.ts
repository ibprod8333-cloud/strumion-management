import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import 'dotenv/config'; // NestJS will now see process.env.*

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,            // remove extra fields
            forbidNonWhitelisted: true, // throw error if unknown fields
            transform: true,            // auto-transform payloads to DTO instances
        }),
    )

    app.enableCors({
        origin: [
            'https://strumion-management.vercel.app',
            'http://localhost:3001'
        ],
        credentials: true,
    });
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    await app.listen(port, () => console.log(`Listening on port ${port}`));
}

bootstrap();
