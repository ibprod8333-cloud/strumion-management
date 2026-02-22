import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseAdminModule } from '../firebase-admin/firebase-admin.module';
import { AuthGuard } from '../common/guards/auth/auth.guard';
import { AdminGuard } from '../common/guards/auth/admin.guard';

@Module({
    imports: [FirebaseAdminModule],
    controllers: [AuthController],
    providers: [AuthService, AuthGuard, AdminGuard],
    exports: [AuthService, AuthGuard, AdminGuard],
})
export class AuthModule {}