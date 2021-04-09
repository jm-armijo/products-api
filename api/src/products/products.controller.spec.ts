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

        public async getList(name: string) : Promise<any> {}
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

            jest.spyOn(service, "create").mockImplementationOnce(() => { throw new Error("An error"); });
            try {
                const actual = await controller.create(name, description, price, deliveryPrice);
                expect(actual).toBeUndefined();
            } catch (error) {
                expect(error.message).toEqual('An error');
            }
        });

        it('should raise error when name is empty', async () => {
            const name          = '';
            const description   = 'a description';
            const price         = 123;
            const deliveryPrice = 4;

            jest.spyOn(service, "create").mockImplementationOnce(() => { throw new Error("ValidationError"); });
            try {
                const actual = await controller.create(name, description, price, deliveryPrice);
                expect(actual).toBeUndefined();
            } catch (error) {
                expect(error.message).toEqual('ValidationError');
            }
        });
    });

    describe('getList', () => {

        const prod1 = {
            id:            'zxcvb-mnbvc-lkjhg',
            name:          'prod1',
            description:   'desc1',
            price:         12,
            deliveryPrice: 3,
        };

        const prod2 = {
            id:            'zxcvb-mnbvc-lkjhk',
            name:          'prodx',
            description:   'desc2',
            price:         13,
            deliveryPrice: 4,
        };

        const prod3 = {
            id:            'zxcvb-mnbvc-lkjhl',
            name:          'prodx',
            description:   'desc3',
            price:         14,
            deliveryPrice: 5,
        };

        it('should return all products when name is undefined',  async () => {
            const name = undefined;
            const query = { name: name, };
            const list = [prod1, prod2, prod3,];
            jest.spyOn(service, 'getList').mockResolvedValueOnce(list);

            const actual = await controller.getList(query);
            const expected = list
            expect(actual).toEqual(expected);
        });

        it('should return producs filtered by name when name is defined',  async () => {
            const name = 'prodx';
            const query = { name: name, };
            const list = [prod2, prod3,];
            jest.spyOn(service, 'getList').mockResolvedValueOnce(list);

            const actual = await controller.getList(query);
            const expected = list
            expect(actual).toEqual(expected);
        });

        it('should return empty list when product name does not exist',  async () => {
            const name = 'badprod';
            const query = { name: name, };
            const list = [];
            jest.spyOn(service, 'getList').mockResolvedValueOnce(list);

            const actual = await controller.getList(query);
            const expected = list
            expect(actual).toEqual(expected);
        });
    });
});
