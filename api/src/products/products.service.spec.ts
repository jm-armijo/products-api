import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';


import { ProductsService } from './products.service';
import { Product, ProductSchema } from './product.model';
import { Option, OptionSchema } from '../options/option.model';


describe('ProductsService', () => {
    let service: ProductsService;
    let model;
    let modelOption;

    beforeEach(async () => {
        model = mongoose.model('Product', ProductSchema);
        modelOption = mongoose.model('Option', OptionSchema);

        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [
                ProductsService,
                {
                    provide: getModelToken('Product'),
                    useValue: model,
                },
                {
                    provide: getModelToken('Option'),
                    useValue: modelOption,
                },
            ],
        }).compile();

        service = moduleRef.get<ProductsService>(ProductsService);
    });

    describe('create', () => {
        let args : any = {
            name:          'a name',
            description:   'a description',
            price:         123,
            deliveryPrice: 4
        };

        it('should return the id of the new product', async () => {
            const id = 'qwerty-12345-zxcvbn';

            let mockedResponse: any = {};
            mockedResponse.id = id;

            jest.spyOn(model.prototype, 'save').mockResolvedValue(mockedResponse);

            const actual = await service.create(args);
            const expected = id;
            expect(actual).toEqual(expected);
        });

        it('should raise error when name is empty', async () => {
            args.name = '';
            jest.spyOn(model.prototype, 'save').mockImplementation(() => { throw new Error("ValidationError"); });

            try {
                const actual = await service.create(args);
                expect(actual).toBeUndefined();
            } catch (error) {
                expect(error.message).toEqual('ValidationError');
            }
        });
    });
});
