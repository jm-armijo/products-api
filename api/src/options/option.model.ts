import * as mongoose from 'mongoose';

export interface Option extends mongoose.Document {
    id:            string;
    productId:     string;
    name:          string;
    description:   string;
}

export const OptionSchema = new mongoose.Schema({
    productId:     { type: String, required: true },
    name:          { type: String, required: true },
    description:   { type: String, required: true },
});

OptionSchema.methods.toJSON = function () {
    const object = this.toObject() as Option;
    const option = {
        id:            object._id,
        productId:     object.productId,
        name:          object.name,
        description:   object.description,
    };

    return option;
}
