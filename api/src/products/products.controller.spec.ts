import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';

describe('ProductsController', () => {
	class ProductsService {
		public async create(
			name:          string,
			description:   string,
			price:         number,
			deliveryPrice: number,
		) : Promise<any> {}
	}

	let controller: ProductsController;
	let service:    ProductsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProductsController],
			providers:   [ProductsService],
		}).compile();

		controller = module.get<ProductsController>(ProductsController);
		service    = module.get<ProductsService>(ProductsService);
	});

	describe('create', () => {
		it('should return the id of the new product', async () => {
			const name          = 'a name';
			const description   = 'a description';
			const price         = 123;
			const deliveryPrice = 4;

			const id            = 'qwerty-12345-zxcvbn';
			jest.spyOn(service, 'create').mockResolvedValueOnce(id);

			const expected = { id: id };
			const actual = await controller.create(name, description, price, deliveryPrice);
			expect(actual).toEqual(expected);
		});

		it('should raise error if service throws', async () => {
			const name          = 'a name';
			const description   = 'a description';
			const price         = 123;
			const deliveryPrice = 4;

            jest.spyOn(service, "create").mockImplementation(() => { throw new Error("An error"); });
			try {
				const actual = await controller.create(name, description, price, deliveryPrice);
				expect(actual).toBeUndefined();
			} catch (error) {
				expect(error.message).toEqual('An error');
			}
		});

		it('should return empty response when name is empty', async () => {
			const name          = '';
			const description   = 'a description';
			const price         = 123;
			const deliveryPrice = 4;

			const id            = '';
			jest.spyOn(service, 'create').mockResolvedValueOnce(id);

			const expected = { id: id };
			const actual = await controller.create(name, description, price, deliveryPrice);
			expect(actual).toEqual(expected);
		});
	});
});
