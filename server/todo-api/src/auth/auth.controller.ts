import { Controller, UseGuards, HttpStatus, Response, Request, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { LoginUserDto } from '../users/dto/loginUser.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { RegistrationStatus } from './interfaces/registrationStatus.interface';
import { UsersService } from '../users/users.service';
import { Inject } from '@nestjs/common';
import { debug } from 'util';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
                private readonly usersService: UsersService) {}

    @Post('register')
    public async register(@Response() res, @Body() createUserDto: CreateUserDto){
        const result = await this.authService.register(createUserDto);
        if (!result.success){
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(HttpStatus.OK).json(result);
    }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    public async login(@Response() res, @Body() login: LoginUserDto){
        return await this.usersService.findOne({ username: login.email}).then(user => {
            if (!user) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: 'User Not Found',
                });
            } else {
                console.log('start getting the token');
                const token = this.authService.createToken(user);
                console.log(token);
                return res.status(HttpStatus.OK).json(token);
            }
        });
    }
}
