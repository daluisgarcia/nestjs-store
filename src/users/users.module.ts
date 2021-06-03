import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [ProductsModule],
})
export class UsersModule {}
