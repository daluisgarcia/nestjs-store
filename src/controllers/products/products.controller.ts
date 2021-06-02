import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    HttpStatus,
    HttpCode,
    //ParseIntPipe,
} from '@nestjs/common';

import { ProductsService } from '../../services/products/products.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dto';

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) {}

    @Get()
    getMany(
        @Query('limit') limit = 100,
        @Query('offset') offset = 0,
        @Query('brand') brand: string,
    ) {
        return {
            // message: `products limit => ${limit} offset => ${offset} brand => ${brand}`,
            message: this.productService.findAll(),
        };
    }

    @Get('filter')
    getFiltered() {
        return {
            message: `Im a filter`,
        };
    }

    @Get(':productId')
    @HttpCode(HttpStatus.OK)
    getOne(@Param('productId', ParseIntPipe) productId: number) {
        return {
            // message: `product ${productId}`,
            message: this.productService.findOne(productId),
        };
    }

    @Post()
    create(@Body() payload: CreateProductDto) {
        this.productService.create(payload);
        return {
            message: `Create action`,
            payload,
        };
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() payload: UpdateProductDto) {
        const updated = this.productService.update(+id, payload);
        return {
            id,
            message: `Update action`,
            updated,
        };
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        if (this.productService.remove(+id)) {
            return {
                id,
                message: 'Product removed',
            };
        }
    }
}
