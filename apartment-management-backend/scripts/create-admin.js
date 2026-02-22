"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../src/app.module");
const firebase_admin_service_1 = require("../src/firebase-admin/firebase-admin.service");
const admin = __importStar(require("firebase-admin"));
async function createAdmin() {
    const email = 'ibprod83@gmail.com';
    const password = 'bobanadminmain';
    const name = 'Admin User';
    try {
        console.log('🔄 Initializing NestJS application...');
        const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
        const firebaseService = app.get(firebase_admin_service_1.FirebaseAdminService);
        console.log('🔄 Creating admin user...');
        const userRecord = await firebaseService.auth.createUser({
            email,
            password,
            displayName: name,
            emailVerified: true,
        });
        console.log('✅ User created in Firebase Auth');
        console.log('   UID:', userRecord.uid);
        await firebaseService.auth.setCustomUserClaims(userRecord.uid, {
            role: 'admin',
        });
        console.log('✅ Admin role assigned via custom claims');
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
    }
    catch (error) {
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
//# sourceMappingURL=create-admin.js.map