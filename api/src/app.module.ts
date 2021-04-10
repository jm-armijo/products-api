import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
import { OptionsModule } from './options/options.module';

@Module({
    imports: [
        ProductsModule,
        OptionsModule,
        MongooseModule.forRoot(
            'mongodb://api:password@products-db:27017/core',
            { useFindAndModify: false },
        ),
    ],
})
export class AppModule {}
