import {
    Body,
    Controller,
    Get,
    Param,
    Put,
    Post,
    Query,
} from '@nestjs/common';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    async create(
        @Body('name')          name:          string,
        @Body('description')   description:   string,
        @Body('price')         price:         number,
        @Body('deliveryPrice') deliveryPrice: number,
    ) {
        const id = await this.productsService.create(
            name,
            description,
            price,
            deliveryPrice,
        );

        return { id: id };
    }

    @Get()
    async getList(@Query() query) {
        return await this.productsService.getList(query.name);
    }

    @Get(':id')
    async getOne(@Param('id') id: string) {
        return await this.productsService.getOne(id);
    }

    @Put(':id')
    async update(
        @Param('id')           id:            string,
        @Body('name')          name:          string,
        @Body('description')   description:   string,
        @Body('price')         price:         number,
        @Body('deliveryPrice') deliveryPrice: number,
    ) {
        return await this.productsService.update(
            id,
            name,
            description,
            price,
            deliveryPrice,
        );
    }
}
