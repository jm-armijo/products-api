import * as mongoose from 'mongoose';

export interface Product extends mongoose.Document {
	id:            string;
	name:          string;
	description:   string;
	price:         number;
	deliveryPrice: number;
}

export const ProductSchema = new mongoose.Schema({
	name:          { type: String, required: true },
	description:   { type: String, required: true },
	price:         { type: Number, required: true },
	deliveryPrice: { type: Number, required: true },
});

ProductSchema.methods.toJSON = function () {
    const object = this.toObject() as Product;
    const product = {
        id:            object._id,
        name:          object.name,
        description:   object.description,
        price:         object.price,
        deliveryPrice: object.deliveryPrice,
    };

    return product;
}
