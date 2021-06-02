import {
    IsString,
    IsNumber,
    IsUrl,
    IsNotEmpty,
    IsEmpty,
    IsPositive,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    @IsString()
    readonly description: string;
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly price: number;
    @IsNumber()
    @IsNotEmpty()
    readonly stock: number;
    @IsUrl()
    @IsEmpty()
    readonly image: string;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}
