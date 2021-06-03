import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    @IsString()
    @IsNotEmpty()
    readonly lastname: string;
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}
