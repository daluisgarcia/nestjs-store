import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from 'src/products/dtos/products.dto';

import { Product } from '../../users/entities/product.entity';

@Injectable()
export class ProductsService {
    private counterId = 1;

    private products: Product[] = [
        {
            id: 0,
            name: 'Product 1',
            description: 'bla bla',
            price: 122,
            stock: 12,
            image: '',
        },
    ];

    findAll() {
        return this.products;
    }

    findOne(id: number) {
        const product = this.products.find((item) => item.id == id);
        if (!product) {
            throw new NotFoundException();
        }
        return product;
    }

    create(payload: CreateProductDto) {
        const newProduct = {
            id: this.counterId,
            ...payload,
        };
        this.counterId++;
        this.products.push(newProduct);
        return newProduct;
    }

    update(id: number, payload: any) {
        const index = this.products.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new NotFoundException(`Product #${id} not found`);
        }
        return (this.products[index] = {
            ...this.products[index],
            ...payload,
        });
    }

    remove(id: number) {
        const index = this.products.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new NotFoundException(`Product #${id} not found`);
        }
        this.products.splice(index, 1);
        return true;
    }
}
