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
import { ProductFilterDto } from './dto/product_filter_dto';

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
    async getOne(@Param() params : ProductFilterDto ) {
        return await this.service.getOne(params);
    }

    @Put(':id')
    async update(@Param() params : ProductFilterDto, @Body() data: UpdateProductDto) {
        return await this.service.update(params, data);
    }

    @Delete(':id')
    async delete(@Param() params : ProductFilterDto) {
        return await this.service.delete(params);
    }
}
