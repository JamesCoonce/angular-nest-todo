import { Controller, UseGuards, HttpStatus, Response, Request, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { RegistrationStatus } from './interfaces/registrationStatus.interface';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

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
        
    }
}
