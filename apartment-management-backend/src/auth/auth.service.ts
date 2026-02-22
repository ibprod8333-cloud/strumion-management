import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateUserDto } from './dto/create-user.dto';
import { FirebaseAdminService } from '../firebase-admin/firebase-admin.service';

@Injectable()
export class AuthService {
    constructor(private readonly firebaseAdmin: FirebaseAdminService) {}

    async createUser(dto: CreateUserDto) {
        try {
            // Check if user already exists
            try {
                await this.firebaseAdmin.auth.getUserByEmail(dto.email);
                throw new BadRequestException('User with this email already exists');
            } catch (error) {
                // User doesn't exist, continue with creation
                if (error instanceof BadRequestException) {
                    throw error;
                }
            }

            // Create user in Firebase Auth
            const userRecord = await this.firebaseAdmin.auth.createUser({
                email: dto.email,
                password: dto.password,
                displayName: dto.name,
                emailVerified: false,
            });

            // Set custom claims (role)
            await this.firebaseAdmin.auth.setCustomUserClaims(userRecord.uid, {
                role: dto.role || 'user',
            });

            // Store additional user data in Firestore
            await this.firebaseAdmin.firestore
                .collection('users')
                .doc(userRecord.uid)
                .set({
                    email: dto.email,
                    name: dto.name,
                    role: dto.role || 'user',
                    createdAt: admin.firestore.FieldValue.serverTimestamp(),
                    createdBy: dto.createdByUid,
                    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                });

            return {
                uid: userRecord.uid,
                email: userRecord.email,
                name: dto.name,
                role: dto.role || 'user',
                message: 'User created successfully',
            };
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new BadRequestException(`Failed to create user: ${error.message}`);
        }
    }

    async verifyToken(token: string) {
        try {
            const decodedToken = await this.firebaseAdmin.auth.verifyIdToken(token);

            // Get user data from Firestore
            const userDoc = await this.firebaseAdmin.firestore
                .collection('users')
                .doc(decodedToken.uid)
                .get();

            return {
                valid: true,
                uid: decodedToken.uid,
                email: decodedToken.email,
                role: decodedToken.role || 'user',
                userData: userDoc.exists ? userDoc.data() : null,
            };
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }

    async getUserInfo(uid: string) {
        try {
            // Get from Firebase Auth
            const userRecord = await this.firebaseAdmin.auth.getUser(uid);

            // Get from Firestore
            const userDoc = await this.firebaseAdmin.firestore
                .collection('users')
                .doc(uid)
                .get();

            if (!userDoc.exists) {
                throw new NotFoundException('User not found in database');
            }

            const userData = userDoc.data();

            return {
                uid: userRecord.uid,
                email: userRecord.email,
                emailVerified: userRecord.emailVerified,
                displayName: userRecord.displayName,
                role: userData?.role || 'user',
                createdAt: userData?.createdAt,
                ...userData,
            };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new NotFoundException('User not found');
        }
    }

    async getAllUsers() {
        try {
            // Get all users from Firestore
            const usersSnapshot = await this.firebaseAdmin.firestore
                .collection('users')
                .orderBy('createdAt', 'desc')
                .get();

            const users = usersSnapshot.docs.map(doc => ({
                uid: doc.id,
                ...doc.data(),
            }));

            return {
                users,
                count: users.length,
            };
        } catch (error) {
            throw new BadRequestException('Failed to fetch users');
        }
    }

    async deleteUser(uid: string) {
        try {
            // Delete from Firebase Auth
            await this.firebaseAdmin.auth.deleteUser(uid);

            // Delete from Firestore
            await this.firebaseAdmin.firestore
                .collection('users')
                .doc(uid)
                .delete();

            return {
                message: 'User deleted successfully',
                uid,
            };
        } catch (error) {
            throw new BadRequestException(`Failed to delete user: ${error.message}`);
        }
    }

    async updateUserRole(uid: string, role: 'admin' | 'user') {
        try {
            // Update custom claims
            await this.firebaseAdmin.auth.setCustomUserClaims(uid, { role });

            // Update Firestore
            await this.firebaseAdmin.firestore
                .collection('users')
                .doc(uid)
                .update({
                    role,
                    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                });

            return {
                message: 'User role updated successfully',
                uid,
                role,
            };
        } catch (error) {
            throw new BadRequestException(`Failed to update user role: ${error.message}`);
        }
    }
}