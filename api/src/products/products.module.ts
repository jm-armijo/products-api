import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductSchema } from './product.model';
import { OptionSchema } from '../options/option.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
        MongooseModule.forFeature([{ name: 'Option',  schema: OptionSchema }]),
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}
