import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { FirebaseAdminService } from '../src/firebase-admin/firebase-admin.service';
import * as admin from 'firebase-admin';

async function createAdmin() {
    // ⚠️ CHANGE THESE VALUES
    const email = 'ibprod83@gmail.com';
    const password = 'bobanadminmain';
    const name = 'Admin User';

    try {
        console.log('🔄 Initializing NestJS application...');

        // Initialize NestJS app to use your existing configuration
        const app = await NestFactory.createApplicationContext(AppModule);
        const firebaseService = app.get(FirebaseAdminService);

        console.log('🔄 Creating admin user...');

        // 1. Create user in Firebase Authentication
        const userRecord = await firebaseService.auth.createUser({
            email,
            password,
            displayName: name,
            emailVerified: true,
        });

        console.log('✅ User created in Firebase Auth');
        console.log('   UID:', userRecord.uid);

        // 2. Set custom claims (admin role)
        await firebaseService.auth.setCustomUserClaims(userRecord.uid, {
            role: 'admin',
        });

        console.log('✅ Admin role assigned via custom claims');

        // 3. Create user document in Firestore
        await firebaseService.firestore.collection('users').doc(userRecord.uid).set({
            email,
            name,
            role: 'admin',
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        console.log('✅ User document created in Firestore');
        console.log('\n🎉 SUCCESS! Admin user created!\n');
        console.log('📋 Login Credentials:');
        console.log('   Email:', email);
        console.log('   Password:', password);
        console.log('   UID:', userRecord.uid);
        console.log('\n⚠️  IMPORTANT: Change this password after first login!\n');

        await app.close();
    } catch (error: any) {
        console.error('❌ Error:', error.message);

        if (error.code === 'auth/email-already-exists') {
            console.log('\n💡 This email already exists. Try:');
            console.log('   1. Use a different email');
            console.log('   2. Delete the existing user in Firebase Console');
        }
    }

    process.exit(0);
}

createAdmin();