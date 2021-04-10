import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Option } from './option.model';

@Injectable()
export class OptionsService {
    constructor(
        @InjectModel('Option') private readonly optionModel: Model<Option>,
    ) {}

    async create(
        productId:   string,
        name:        string,
        description: string,
    ) {
        const model = new this.optionModel({
            productId,
            name,
            description,
        });
        const result = await model.save();
        return result.id as string;
    }

    async getList(
        productId: string,
        name:      string,
    ) {
        let filter : any = { productId : productId };
        if (name == undefined) {
            filter.name = name;
        }

        const options = await this.optionModel.find(filter).exec();
        return options.map(option => (this.mapOption(option)));
    }

    async update(
        productId:   string,
        id:          string,
        name:        string,
        description: string,
    ) : Promise<void> {
        let update: any = {};

        if (name !== undefined) {
            update.name = name;
        }

        if (description !== undefined) {
            update.description = description;
        }

        await this.optionModel.findByIdAndUpdate(id, update).where({ productId: productId });
    }

    async delete(productId: string, id: string) {
        await this.optionModel.findByIdAndDelete(id).where({ productId: productId });
    }

    mapOption(option: Option) {
        if (option == undefined) {
            return {};
        }

        return {
            id:            option.id,
            productId:     option.productId,
            name:          option.name,
            description:   option.description,
        };
    }
}
