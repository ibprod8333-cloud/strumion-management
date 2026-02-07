// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
//
// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import {ConfigModule} from '@nestjs/config';
import {Module} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {PropertiesModule} from './properties/properties.module';
import {BookingsModule} from './bookings/bookings.module';
import {PaymentsModule} from './payments/payments.module';
import {AuthModule} from './auth/auth.module';
import {BuildingsModule} from './buildings/buildings.module';
import {FirebaseAdminModule} from './firebase-admin/firebase-admin.module';
import { ApartmentsModule } from './apartments/apartments.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        UsersModule,
        PropertiesModule,
        BookingsModule,
        PaymentsModule,
        AuthModule,
        BuildingsModule,
        FirebaseAdminModule,
        ApartmentsModule
    ],
})
export class AppModule {
}