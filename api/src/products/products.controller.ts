import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Put,
    Post,
    Query,
} from '@nestjs/common';

import { ProductsService } from './products.service';

import { CreateProductDto } from './dto/create_product_dto';
import { GetProductsDto } from './dto/get_products_dto';
import { UpdateProductDto } from './dto/update_product_dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly service: ProductsService) {}

    @Post()
    async create(@Body() data: CreateProductDto) {
        const id = await this.service.create(data);
        return { id: id };
    }

    @Get()
    async getList(@Query() data: GetProductsDto) {
        return await this.service.getList(data);
    }

    @Get(':id')
    async getOne(@Param('id') id: string) {
        return await this.service.getOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: UpdateProductDto) {
        return await this.service.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.service.delete(id);
    }
}
