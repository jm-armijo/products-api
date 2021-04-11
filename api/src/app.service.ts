import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Product } from './products/product.model';
import { Option } from './options/option.model';

@Injectable()
export class AppService {
    constructor(
        @InjectModel('Product') protected readonly productModel: Model<Product>,
        @InjectModel('Option') protected readonly optionModel: Model<Option>,
    ) {}

    async assertProductExists(id: string) {
        const option = await this.productModel.findById(id).exec();
        if (option == null) {
            throw new NotFoundException;
        }
    }

    async assertOptionExists(filter: any) {
        const option = await this.optionModel.findOne(filter).exec();
        if (option == null) {
            throw new NotFoundException;
        }
    }
}
