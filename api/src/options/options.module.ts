import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OptionsController } from './options.controller';
import { OptionsService } from './options.service';
import { OptionSchema } from './option.model';
import { ProductSchema } from '../products/product.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Option', schema: OptionSchema }]),
        MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    ],
    controllers: [OptionsController],
    providers: [OptionsService],
})
export class OptionsModule {}
