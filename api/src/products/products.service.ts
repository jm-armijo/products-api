import { AppService } from '../app.service';

import { CreateProductDto } from './dto/create_product_dto';
import { GetProductsDto } from './dto/get_products_dto';
import { UpdateProductDto } from './dto/update_product_dto';
import { ProductFilterDto } from './dto/product_filter_dto';

export class ProductsService extends AppService {
    async create(data: CreateProductDto) {
        const result = await new this.productModel(data).save();
        return result.id as string;
    }

    async getList(data: GetProductsDto) {
        return await this.productModel.find(data).exec();
    }

    async getOne(params: ProductFilterDto) {
        await this.assertProductExists(params.id);
        return await this.productModel.findById(params.id).exec();
    }

    async update(params: ProductFilterDto, data: UpdateProductDto) : Promise<void> {
        await this.assertProductExists(params.id);
        await this.productModel.findByIdAndUpdate(params.id, data);
    }

    async delete(params: ProductFilterDto) {
        await this.assertProductExists(params.id);

        // MongoDB does not support sessions for different schemas, so
        // we cannot make atomic operations on product and options to rollback
        // in case of an exception. Any attempt to do a manual rollback is
        // destined to fail, so just living with that until we can find
        // a solution for this issue.
        await this.optionModel.deleteMany({ productId: params.id });
        await this.productModel.findByIdAndDelete(params.id);
    }
}
