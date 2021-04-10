import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from '../products/product.model';
import { Option } from './option.model';

import { CreateOptionDto } from './dto/create_option_dto';
import { GetOptionFilterDto } from './dto/get_option_dto';
import { GetOptionsDto } from './dto/get_options_dto';
import { UpdateOptionDataDto, UpdateOptionFilterDto } from './dto/update_option_dto';
import { DeleteOptionFilterDto } from './dto/delete_option_dto';

@Injectable()
export class OptionsService {
    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>,
        @InjectModel('Option') private readonly optionModel: Model<Option>,
    ) {}

    async create(data: CreateOptionDto) {
        await this.assertProductExists(data.productId);
        const result = await new this.optionModel(data).save();
        return result.id as string;
    }

    async getList(params: GetOptionsDto) {
        await this.assertProductExists(params.productId);
        return await this.optionModel.find(params).exec();
    }

    async getOne(filter: GetOptionFilterDto) {
        await this.assertOptionExists(filter);
        return await this.optionModel.findOne(filter).exec();
    }

    async update(filter: UpdateOptionFilterDto, data: UpdateOptionDataDto) : Promise<void> {
        await this.assertOptionExists(filter);
        await this.optionModel.findOneAndUpdate(filter, data).exec();
    }

    async delete(filter: DeleteOptionFilterDto) {
        await this.assertOptionExists(filter);
        await this.optionModel.findOneAndDelete(filter).exec();
    }

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
