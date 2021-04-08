import {
	Controller,
	Post,
	Body,
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
}
