import { Controller, UseGuards, HttpStatus, Response, Request, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { RegistrationStatus } from './interfaces/registrationStatus.interface';
import { UsersService } from '../users/users.service';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
                private readonly usersService: UsersService) {}

    @Post()
    public async register(@Response() res, @Body() createUserDto: CreateUserDto){
        const result = await this.authService.register(createUserDto);
        if (!result.success){
            return res.status(HttpStatus.BAD_REQUEST).json(result.message);
        }
        return res.status(HttpStatus.OK).json(result.message);
    }

    @Post()
    @UseGuards(AuthGuard('login'))
    public async login(@Response() res, @Body() login){
        return await this.usersService.findOne(login.email).then(user => {
            if (!user) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: 'User Not Found',
                });
            } else {
                return this.authService.createToken(login);
            }
        });
    }
}
