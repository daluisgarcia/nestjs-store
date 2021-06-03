import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
    @Get(':id/products/:productId')
    getCategories(
        @Param('productId') productId: string,
        @Param('id') id: string,
    ) {
        return {
            message: `product ${productId} and ${id}`,
        };
    }

    @Post()
    create(@Body() payload: JSON) {
        return {
            message: `Create action`,
            payload,
        };
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() payload: any) {
        return {
            id,
            message: `Update action`,
            payload,
        };
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return {
            id,
            message: `Delete action`,
        };
    }
}
