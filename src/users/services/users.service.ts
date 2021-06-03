import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProductsService } from 'src/products/services/products.service';
import { CreateUserDto } from '../dtos/users.dto';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        private productService: ProductsService,
        // Global config module
        private configService: ConfigService,
    ) {}

    private counterId = 1;
    private users: User[] = [
        {
            id: 0,
            name: 'Daniel',
            lastname: 'Luis',
            email: 'test@test.com',
        },
    ];

    findAll() {
        console.log(this.configService.get('API_KEY'));
        return this.users;
    }

    findOne(id: number) {
        const product = this.users.find((item) => item.id == id);
        if (!product) {
            throw new NotFoundException();
        }
        return product;
    }

    create(payload: CreateUserDto) {
        const newUser = {
            id: this.counterId,
            ...payload,
        };
        this.counterId++;
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, payload: any) {
        const index = this.users.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new NotFoundException(`Product #${id} not found`);
        }
        return (this.users[index] = {
            ...this.users[index],
            ...payload,
        });
    }

    remove(id: number) {
        const index = this.users.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new NotFoundException(`Product #${id} not found`);
        }
        this.users.splice(index, 1);
        return true;
    }

    getOrderByUser(id: number): Order {
        const user = this.findOne(id);
        return {
            date: new Date(),
            user,
            products: this.productService.findAll(),
        };
    }
}
