import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { BrandsModule } from './brands/brands.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

import { enviroments } from './enviroments';
import config from './config';

@Module({
    imports: [
        ConfigModule.forRoot({
            // Helps to choose a .env file depending on the enviroment
            envFilePath: enviroments[process.env.NODE_ENV] || '.env',
            // Importing a config file
            load: [config],
            isGlobal: true,
        }),
        UsersModule,
        ProductsModule,
        BrandsModule,
        DatabaseModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
