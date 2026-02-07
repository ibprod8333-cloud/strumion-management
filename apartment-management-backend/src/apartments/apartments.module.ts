import {Module} from '@nestjs/common';
import {ApartmentsService} from './apartments.service';
import {ApartmentsController} from './apartments.controller';
import {BuildingsModule} from "../buildings/buildings.module";
import {FirebaseAdminModule} from "../firebase-admin/firebase-admin.module";

@Module({
    imports: [
        BuildingsModule,
        FirebaseAdminModule
    ],
    providers: [ApartmentsService],
    controllers: [ApartmentsController]
})
export class ApartmentsModule {
}
