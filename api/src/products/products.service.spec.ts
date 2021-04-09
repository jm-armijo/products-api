import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';


import { ProductsService } from './products.service';
import { Product, ProductSchema } from './product.model';


describe('ProductsService', () => {
	let service: ProductsService;
	let model;

	beforeEach(async () => {
		model = mongoose.model('Products', ProductSchema);

		const moduleRef: TestingModule = await Test.createTestingModule({
			providers: [
				ProductsService,
				{
					provide: getModelToken('Product'),
					useValue: model,
				},
			],
		}).compile();

		service = moduleRef.get<ProductsService>(ProductsService);
	});

	describe('create', () => {
		it('should return the id of the new product', async () => {
			const name          = 'a name';
			const description   = 'a description';
			const price         = 123;
			const deliveryPrice = 4;
			const id            = 'qwerty-12345-zxcvbn';

			let mockedResponse: any = {};
			mockedResponse.id = id;

			jest.spyOn(model.prototype, 'save').mockResolvedValue(mockedResponse);

			const actual = await service.create(name, description, price, deliveryPrice);
			const expected = id;
			expect(actual).toEqual(expected);
		});

		it('should raise error when name is empty', async () => {
			const name          = '';
			const description   = 'a description';
			const price         = 123;
			const deliveryPrice = 4;

			jest.spyOn(model.prototype, 'save').mockImplementation(() => { throw new Error("ValidationError"); });

			const actual = await service.create(name, description, price, deliveryPrice);
			const expected = ''
			expect(actual).toEqual(expected);
		});
	});
});
