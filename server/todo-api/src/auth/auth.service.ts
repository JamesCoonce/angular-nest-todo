import * as jwt from 'jsonwebtoken';
import { sign } from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) { }

    async createToken(user) {
        const expiresIn = 3600;
        const accessToken = jwt.sign({ id: user.id, email: user.username }, 'secretKey', { expiresIn });
        return {
            expiresIn,
            accessToken,
        };
    }
    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.usersService.findById(payload.id);
    }
}
