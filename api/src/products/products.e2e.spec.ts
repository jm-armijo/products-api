import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, NotFoundException, InternalServerErrorException } from '@nestjs/common';

import { ProductsController } from './products.controller';

describe('Products', () => {
    let app: INestApplication;
    let getListCount : number = 0;

    const prod1 = {
        id:            '60712e92099c4b001e3af461',
        name:          'prod1',
        description:   'desc1',
        price:         12,
        deliveryPrice: 3,
    };

    const prod2 = {
        id:            '606e9304d94efa002a6cc949',
        name:          'prodx',
        description:   'desc2',
        price:         13,
        deliveryPrice: 4,
    };

    const prod3 = {
        id:            '606e96fe7a5cef00295c97a1',
        name:          'prodx',
        description:   'desc3',
        price:         14,
        deliveryPrice: 5,
    };

    class ProductsService {
        public async create()  : Promise<any> {}
        public async getList() : Promise<any> {}
        public async getOne()  : Promise<any> {}
        public async delete()  : Promise<any> {}
        public async update() : Promise<void> {}
    }

    let service: ProductsService;
    const internalServerError = { statusCode: 500, message: 'Internal Server Error' };
    const notFoundError = { statusCode: 404, message: 'Not Found' };
    const badRequestError = function(messages) {
        return {statusCode: 400, message: messages, error: "Bad Request"};
    }


    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers:   [ProductsService],
        }).compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();

        service = moduleRef.get<ProductsService>(ProductsService);
    });

    describe('/POST products', () => {
        let data : any = {};

        beforeEach(async () => {
            data = {
                name          : 'a name',
                description   : 'a description',
                price         : 123,
                deliveryPrice : 4,
            };
        });

        it('should return the id of the new product', async () => {
            jest.spyOn(service, 'create').mockResolvedValueOnce(prod1.id);
            const expected = {id: prod1.id};

            return request(app.getHttpServer())
            .post('/products')
            .send(data)
            .expect(201)
            .expect(expected);
        });

        it('should return error response when name is empty', async () => {
            data.name = '';
            const error = badRequestError(["name should not be empty"]);

            return request(app.getHttpServer())
            .post('/products')
            .send(data)
            .expect(400)
            .expect(error);
        });

        it('should return error response when description is empty', async () => {
            data.description = '';
            const error = badRequestError(["description should not be empty"]);

            return request(app.getHttpServer())
            .post('/products')
            .send(data)
            .expect(400)
            .expect(error);
        });

        it('should return error response when price is negative', async () => {
            data.price = -1;
            const error = badRequestError(["price must not be less than 0"]);

            return request(app.getHttpServer())
            .post('/products')
            .send(data)
            .expect(400)
            .expect(error);
        });

        it('should return error response when price is a string', async () => {
            data.price = 'a string';
            const error_messages = [
                'price must not be less than 0',
                'price must be a number conforming to the specified constraints',
            ]
            const error = badRequestError(error_messages);

            return request(app.getHttpServer())
            .post('/products')
            .send(data)
            .expect(400)
            .expect(error);
        });

        it('should return error response when deliveryPrice is negative', async () => {
            data.deliveryPrice = -1;
            const error = badRequestError(["deliveryPrice must not be less than 0"]);

            return request(app.getHttpServer())
            .post('/products')
            .send(data)
            .expect(400)
            .expect(error);
        });

        it('should return error response when deliveryPrice is a string', async () => {
            data.deliveryPrice = 'a string';
            const error_messages = [
                'deliveryPrice must not be less than 0',
                'deliveryPrice must be a number conforming to the specified constraints',
            ]
            const error = badRequestError(error_messages);

            return request(app.getHttpServer())
            .post('/products')
            .send(data)
            .expect(400)
            .expect(error);
        });

        it('should return error response when service raises an unhandled error', async () => {
            jest.spyOn(service, 'create').mockImplementationOnce(() => { throw new InternalServerErrorException; });

            return request(app.getHttpServer())
            .post('/products')
            .send(data)
            .expect(500)
            .expect(internalServerError);
        });
    });

    describe('/GET products', () => {
        it(`should return all products when no error`, () => {
            const list = [prod1, prod2, prod3,];
            jest.spyOn(service, 'getList').mockResolvedValueOnce(list);

            return request(app.getHttpServer())
            .get('/products')
            .expect(200)
            .expect(list);
        });

        it(`should return empty list when no products to return`, () => {
            const list = [];
            jest.spyOn(service, 'getList').mockResolvedValueOnce(list);

            return request(app.getHttpServer())
            .get('/products')
            .expect(200)
            .expect(list);
        });

        it(`should return all products with a name value when a name is given`, () => {
            const list = [prod2, prod3,];
            jest.spyOn(service, 'getList').mockResolvedValueOnce(list);

            return request(app.getHttpServer())
            .get('/products?name=prodx')
            .expect(200)
            .expect(list);
        });

        it(`should return empty list when a name is given and no products match`, () => {
            const list = [];
            jest.spyOn(service, 'getList').mockResolvedValueOnce(list);

            return request(app.getHttpServer())
            .get('/products?name=prodx')
            .expect(200)
            .expect(list);
        });

        it('should return error response when service raises an unhandled error', async () => {
            jest.spyOn(service, 'getList').mockImplementationOnce(() => { throw new InternalServerErrorException; });

            return request(app.getHttpServer())
            .get('/products?name=name')
            .expect(500)
            .expect(internalServerError);
        });
    });

    describe('/GET products/<id>', () => {
        it(`should return the product when no error`, () => {
            jest.spyOn(service, 'getOne').mockResolvedValueOnce(prod1);

            return request(app.getHttpServer())
            .get('/products/'+prod1.id)
            .expect(200)
            .expect(prod1);
        });

        it(`should return error response when product does not exist`, () => {
            jest.spyOn(service, 'getOne').mockImplementationOnce(() => { throw new NotFoundException; });

            return request(app.getHttpServer())
            .get('/products/'+prod1.id)
            .expect(404)
            .expect(notFoundError);
        });

        it('should return error response when service raises an unhandled error', async () => {
            jest.spyOn(service, 'getOne').mockImplementationOnce(() => { throw new InternalServerErrorException; });

            return request(app.getHttpServer())
            .get('/products/'+prod1.id)
            .expect(500)
            .expect(internalServerError);
        });
    });

    describe('/PUT products/<id>', () => {
        let data : any;
        beforeEach(async () => {
            data = {};
        });

        it('should succeed when data is changed', async () => {
            jest.spyOn(service, 'update').mockResolvedValueOnce(undefined);

            data.name = 'new name';
            data.description = 'new description';
            data.price = prod1.price + 35;
            data.deliveryPrice = prod1.deliveryPrice + 4.1;

            return request(app.getHttpServer())
            .put('/products/'+prod1.id)
            .send(data)
            .expect(200)
            .expect('');
        });

        it('should succeed when no data to update is sent', async () => {
            jest.spyOn(service, 'update').mockResolvedValueOnce(undefined);

            return request(app.getHttpServer())
            .put('/products/'+prod1.id)
            .send(data)
            .expect(200)
            .expect('');
        });

        it('should return error response when name is empty', async () => {
            data.name = '';
            const error = badRequestError(["name should not be empty"]);

            return request(app.getHttpServer())
            .put('/products/'+prod1.id)
            .send(data)
            .expect(400)
            .expect(error);
        });

        it('should return error response when description is empty', async () => {
            data.description = '';
            const error = badRequestError(["description should not be empty"]);

            return request(app.getHttpServer())
            .put('/products/'+prod1.id)
            .send(data)
            .expect(400)
            .expect(error);
        });

        it('should return error response when price is negative', async () => {
            data.price = -1;
            const error = badRequestError(["price must not be less than 0"]);

            return request(app.getHttpServer())
            .put('/products/'+prod1.id)
            .send(data)
            .expect(400)
            .expect(error);
        });

        it('should return error response when price is a string', async () => {
            data.price = 'a string';
            const error_messages = [
                'price must not be less than 0',
                'price must be a number conforming to the specified constraints',
            ]
            const error = badRequestError(error_messages);

            return request(app.getHttpServer())
            .put('/products/'+prod1.id)
            .send(data)
            .expect(400)
            .expect(error);
        });

        it('should return error response when deliveryPrice is negative', async () => {
            data.deliveryPrice = -1;
            const error = badRequestError(["deliveryPrice must not be less than 0"]);

            return request(app.getHttpServer())
            .put('/products/'+prod1.id)
            .send(data)
            .expect(400)
            .expect(error);
        });

        it('should return error response when deliveryPrice is a string', async () => {
            data.deliveryPrice = 'a string';
            const error_messages = [
                'deliveryPrice must not be less than 0',
                'deliveryPrice must be a number conforming to the specified constraints',
            ]
            const error = badRequestError(error_messages);

            return request(app.getHttpServer())
            .put('/products/'+prod1.id)
            .send(data)
            .expect(400)
            .expect(error);
        });

        it(`should return error response when product does not exist`, () => {
            jest.spyOn(service, 'update').mockImplementationOnce(() => { throw new NotFoundException; });

            return request(app.getHttpServer())
            .put('/products/'+prod1.id)
            .send(data)
            .expect(404)
            .expect(notFoundError);
        });

        it('should return error response when service raises an unhandled error', async () => {
            jest.spyOn(service, 'update').mockImplementationOnce(() => { throw new InternalServerErrorException; });

            return request(app.getHttpServer())
            .put('/products/'+prod1.id)
            .send(data)
            .expect(500)
            .expect(internalServerError);
        });
    });

    describe('/DELETE products/<id>', () => {
        it(`should delete the product when no error`, () => {
            jest.spyOn(service, 'delete').mockResolvedValueOnce(undefined);

            return request(app.getHttpServer())
            .delete('/products/'+prod1.id)
            .expect(200)
            .expect('');
        });

        it(`should return error response when product does not exist`, () => {
            jest.spyOn(service, 'delete').mockImplementationOnce(() => { throw new NotFoundException; });

            return request(app.getHttpServer())
            .delete('/products/'+prod1.id)
            .expect(404)
            .expect(notFoundError);
        });

        it('should return error response when service raises an unhandled error', async () => {
            jest.spyOn(service, 'delete').mockImplementationOnce(() => { throw new InternalServerErrorException; });

            return request(app.getHttpServer())
            .delete('/products/'+prod1.id)
            .expect(500)
            .expect(internalServerError);
        });
    });


    afterAll(async () => {
        await app.close();
    });
});
