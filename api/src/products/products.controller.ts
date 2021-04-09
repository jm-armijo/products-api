import {
    Body,
    Controller,
    Get,
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
    async getList(
        @Query() query,
    ) {
        const products = await this.productsService.getList(query.name);
        return products;
    }
}
