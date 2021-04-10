import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';
import { Option } from '../options/option.model';

import { CreateProductDto } from './dto/create_product_dto';
import { GetProductsDto } from './dto/get_products_dto';
import { UpdateProductDto } from './dto/update_product_dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>,
        @InjectModel('Option') private readonly optionModel: Model<Option>,
    ) {}

    async create(data: CreateProductDto) {
        const result = await new this.productModel(data).save();
        return result.id as string;
    }

    async getList(data: GetProductsDto) {
        return await this.productModel.find(data).exec();
    }

    async getOne(id: string) {
        await this.assertProductExists(id);
        return await this.productModel.findById(id).exec();
    }

    async update(id: string, data: UpdateProductDto) : Promise<void> {
        await this.assertProductExists(id);
        await this.productModel.findByIdAndUpdate(id, data);
    }

    async delete(id: string) {
        await this.assertProductExists(id);

        // Use transaction to delete from the two schemas
        const session : any = await this.productModel.startSession();
        await session.withTransaction(async () => {
            try {
                await this.optionModel.deleteMany({ productId: id });
                await this.productModel.findByIdAndDelete(id);
                await session.commitTransaction();
            } catch (error) {
                await session.abortTransaction();
            } finally {
                session.endSession();
            }
        });
    }

    async assertProductExists(id: string) {
        const option = await this.productModel.findById(id).exec();
        if (option == null) {
            throw new NotFoundException;
        }
    }
}
