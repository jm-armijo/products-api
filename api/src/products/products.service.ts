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
        const model = new this.productModel({
            name,
            description,
            price,
            deliveryPrice,
        });
        const result = await model.save();
        return result.id as string;
    }

    async getList(
        name: string,
    ) {
        const filter = name == undefined ? undefined : { name: name };
        const products = await this.productModel.find(filter).exec();

        return products.map(product => ({
            id:            product.id,
            name:          product.name,
            description:   product.description,
            price:         product.price,
            deliveryPrice: product.deliveryPrice,
        }));
    }
}
