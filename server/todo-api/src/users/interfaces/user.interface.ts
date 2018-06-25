import { Document, PassportLocalDocument } from 'mongoose';

export interface IUser extends PassportLocalDocument {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
}