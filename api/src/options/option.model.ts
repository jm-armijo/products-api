import * as mongoose from 'mongoose';

export const OptionSchema = new mongoose.Schema({
	productId:     { type: String, required: true },
	name:          { type: String, required: true },
	description:   { type: String, required: true },
});

export interface Option extends mongoose.Document {
	id:            string;
    productId:     string;
	name:          string;
	description:   string;
}
