import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
	constructor(
		@InjectModel('Product') private readonly productModel: Model<Product>,
	) {}

	async create(
		name:          string,
		description:   string,
		price:         number,
		deliveryPrice: number,
	) {
		const product = new this.productModel({
			name,
			description,
			price,
			deliveryPrice,
		});
		const result = await product.save();
		return result.id as string;
	}
}
