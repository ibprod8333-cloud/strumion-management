import {NestFactory, Reflector} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import 'dotenv/config';
import {AuthGuard} from "./common/guards/auth/auth.guard";
import {FirebaseAdminService} from "./firebase-admin/firebase-admin.service";


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

    const reflector = app.get(Reflector);
    app.useGlobalGuards(new AuthGuard(
        app.get(FirebaseAdminService),
        reflector
    ));

    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    await app.listen(port, () => console.log(`Listening on port ${port}`));
    console.log(`🔒 All endpoints are protected by default`);
}

bootstrap();
