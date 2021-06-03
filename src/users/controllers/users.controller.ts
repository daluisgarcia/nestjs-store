import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    getMany(
        @Query('limit') limit = 100,
        @Query('offset') offset = 0,
        @Query('brand') brand: string,
    ) {
        return {
            // message: `products limit => ${limit} offset => ${offset} brand => ${brand}`,
            message: this.userService.findAll(),
        };
    }

    @Get('filter')
    getFiltered() {
        return {
            message: `Im a filter`,
        };
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getOne(@Param('id', ParseIntPipe) id: number) {
        return {
            message: this.userService.findOne(id),
        };
    }

    @Get(':id/orders')
    getOrders(@Param('id', ParseIntPipe) id: number) {
        return {
            message: this.userService.findOne(id),
        };
    }

    @Post()
    create(@Body() payload: CreateUserDto) {
        this.userService.create(payload);
        return {
            message: `Create action`,
            payload,
        };
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() payload: UpdateUserDto) {
        const updated = this.userService.update(+id, payload);
        return {
            id,
            message: `Update action`,
            updated,
        };
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        if (this.userService.remove(+id)) {
            return {
                id,
                message: 'Product removed',
            };
        }
    }
}
