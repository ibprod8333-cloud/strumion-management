import {Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import {AdminGuard} from '../common/guards/auth/admin.guard';
import {AuthGuard} from '../common/guards/auth/auth.guard';
import {CreateUserDto} from './dto/create-user.dto';
import {VerifyTokenDto} from './dto/verify-token.dto';
import {AuthService} from './auth.service';
import {Public} from "../common/decorators/public.decorator";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    // Only admins can create users
    @Post('create-user')
    @UseGuards(AdminGuard)
    async createUser(@Body() createUserDto: CreateUserDto, @Req() req: any) {
        // Set the createdByUid from the authenticated admin user
        createUserDto.createdByUid = req.user.uid;
        return this.authService.createUser(createUserDto);
    }

    // Verify Firebase token (public endpoint - no guard)
    @Public()
    @Post('verify')
    async verifyToken(@Body() verifyTokenDto: VerifyTokenDto) {
        return this.authService.verifyToken(verifyTokenDto.token);
    }

    // Get current user info (requires authentication)
    @Get('me')
    @UseGuards(AuthGuard)
    async getCurrentUser(@Req() req: any) {
        return this.authService.getUserInfo(req.user.uid);
    }

    // Get all users (admin only)
    @Get('users')
    @UseGuards(AdminGuard) // todo: we need to
    // make sure the frontend hides this if the user is not admin
    async getAllUsers() {
        return this.authService.getAllUsers();
    }

    // Delete user (admin only)
    @Post('delete-user/:uid')
    @UseGuards(AdminGuard)
    async deleteUser(@Param('uid') uid: string) {
        return this.authService.deleteUser(uid);
    }
}