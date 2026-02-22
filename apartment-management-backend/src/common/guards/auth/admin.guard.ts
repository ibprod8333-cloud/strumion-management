import {CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException} from '@nestjs/common';
import {FirebaseAdminService} from '../../../firebase-admin/firebase-admin.service';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private readonly firebaseAdmin: FirebaseAdminService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        try {
            const decodedToken = await this.firebaseAdmin.auth.verifyIdToken(token);

            // Check if user has admin role in custom claims
            if (!decodedToken.role || decodedToken.role !== 'admin') {
                throw new ForbiddenException('Admin access required');
            }

            request.user = decodedToken; // Attach user to request
            return true;
        } catch (error) {
            if (error instanceof ForbiddenException) {
                throw error;
            }
            throw new UnauthorizedException('Invalid token');
        }
    }
}