import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import * as admin from 'firebase-admin';
import {runMigrations} from './migration-runner';
import {migrations} from './index';

@Injectable()
export class MigrationService implements OnModuleInit {
    private readonly logger = new Logger(MigrationService.name);

    async onModuleInit() {
        // 🔥 DO NOT await this
        runMigrations(admin.firestore(), migrations, msg =>
            this.logger.log(msg),
        ).catch(err => {
            this.logger.error('Migration failed', err);
        });
    }
}