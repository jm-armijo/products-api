import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, NotFoundException, InternalServerErrorException } from '@nestjs/common';

import { OptionsController } from './options.controller';

describe('Options', () => {
    let app: INestApplication;
    let getListCount : number = 0;

    const opt1 = {
        id:            'zxcvb-mnbvc-lkjhg',
        productId:     'dorp-poiuy-trewq',
        name:          'option1',
        description:   'desc1',
    };

    const opt2 = {
        id:            'zxcvb-mnbvc-lkjhk',
        productId:     'prod-poiuy-trewq',
        name:          'option2',
        description:   'desc2',
    };

    const opt3 = {
        id:            'zxcvb-mnbvc-lkjhl',
        productId:     'prod-poiuy-trewq',
        name:          'option3',
        description:   'desc3',
    };

    class OptionsService {
        public async create()  : Promise<any> {}
        public async getList() : Promise<any> {}
        public async getOne()  : Promise<any> {}
        public async delete()  : Promise<any> {}
        public async update() : Promise<void> {}
    }

    let service: OptionsService;
    const internalServerError = { statusCode: 500, message: 'Internal Server Error' };
    const notFoundError = { statusCode: 404, message: 'Not Found' };
    const badRequestError = function(messages) {
        return {statusCode: 400, message: messages, error: "Bad Request"};
    }


    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [OptionsController],
            providers:   [OptionsService],
        }).compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();

        service = moduleRef.get<OptionsService>(OptionsService);
    });

    describe('/POST products/<prodId>/options', () => {
        let data : any = {};

        beforeEach(async () => {
            data = {
                name          : 'a name',
                description   : 'a description',
            };
        });

        it('should return the id of the new option', async () => {
            jest.spyOn(service, 'create').mockResolvedValueOnce(opt1.id);
            const expected = {id: opt1.id};

            return request(app.getHttpServer())
            .post('/products/'+opt1.productId+'/options')
            .send(data)
            .expect(201)
            .expect(expected);
        });

        it('should return error response when name is empty', async () => {
            data.name = '';
            const error = badRequestError(["name should not be empty"]);

            return request(app.getHttpServer())
            .post('/products/'+opt1.productId+'/options')
            .send(data)
            .expect(400)
            .expect(error);
        });

        it('should return error response when description is empty', async () => {
            data.description = '';
            const error = badRequestError(["description should not be empty"]);

            return request(app.getHttpServer())
            .post('/products/'+opt1.productId+'/options')
            .send(data)
            .expect(400)
            .expect(error);
        });

        it(`should return error response when product does not exist`, () => {
            jest.spyOn(service, 'create').mockImplementationOnce(() => { throw new NotFoundException; });

            return request(app.getHttpServer())
            .post('/products/'+opt1.productId+'/options')
            .send(data)
            .expect(404)
            .expect(notFoundError);
        });

        it('should return error response when service raises an unhandled error', async () => {
            jest.spyOn(service, 'create').mockImplementationOnce(() => { throw new InternalServerErrorException; });

            return request(app.getHttpServer())
            .post('/products/'+opt1.productId+'/options')
            .send(data)
            .expect(500)
            .expect(internalServerError);
        });
    });

    describe('/GET products/<productId>/options', () => {
        it(`should return list with 1 option when product has 1 option`, () => {
            const list = [opt1]
            jest.spyOn(service, 'getList').mockResolvedValueOnce(list);

            return request(app.getHttpServer())
            .get('/products/'+opt1.productId+'/options')
            .expect(200)
            .expect(list);
        });

        it(`should return list with 2 option when product has 2 option`, () => {
            const list = [opt2, opt3]
            jest.spyOn(service, 'getList').mockResolvedValueOnce(list);

            return request(app.getHttpServer())
            .get('/products/'+opt2.productId+'/options')
            .expect(200)
            .expect(list);
        });

        it(`should return empty list when no options to return`, () => {
            const list = [];
            jest.spyOn(service, 'getList').mockResolvedValueOnce(list);

            return request(app.getHttpServer())
            .get('/products/'+opt1.productId+'/options')
            .expect(200)
            .expect(list);
        });

        it(`should return error response when product does not exist`, () => {
            jest.spyOn(service, 'getList').mockImplementationOnce(() => { throw new NotFoundException; });

            return request(app.getHttpServer())
            .get('/products/'+opt1.productId+'/options')
            .expect(404)
            .expect(notFoundError);
        });

        it('should return error response when service raises an unhandled error', async () => {
            jest.spyOn(service, 'getList').mockImplementationOnce(() => { throw new InternalServerErrorException; });

            return request(app.getHttpServer())
            .get('/products/'+opt1.productId+'/options')
            .expect(500)
            .expect(internalServerError);
        });
    });

    describe('/GET products/<productId>/options/<id>', () => {
        it(`should return the option when no error`, () => {
            jest.spyOn(service, 'getOne').mockResolvedValueOnce(opt1);

            return request(app.getHttpServer())
            .get('/products/'+opt1.productId+'/options/'+opt1.id)
            .expect(200)
            .expect(opt1);
        });

        it(`should return one option when product has multiple options`, () => {
            jest.spyOn(service, 'getOne').mockResolvedValueOnce(opt2);

            return request(app.getHttpServer())
            .get('/products/'+opt1.productId+'/options/'+opt2.id)
            .expect(200)
            .expect(opt2);
        });

        it(`should return error response when product and/or option do not exist`, () => {
            jest.spyOn(service, 'getOne').mockImplementationOnce(() => { throw new NotFoundException; });

            return request(app.getHttpServer())
            .get('/products/'+opt1.productId+'/options/'+opt1.id)
            .expect(404)
            .expect(notFoundError);
        });

        it('should return error response when service raises an unhandled error', async () => {
            jest.spyOn(service, 'getOne').mockImplementationOnce(() => { throw new InternalServerErrorException; });

            return request(app.getHttpServer())
            .get('/products/'+opt1.productId+'/options/'+opt1.id)
            .expect(500)
            .expect(internalServerError);
        });
    });

    describe('/PUT products/<productId>/options/<id>', () => {
        let data : any;
        beforeEach(async () => {
            data = {};
        });

        it('should succeed when data is changed', async () => {
            jest.spyOn(service, 'update').mockResolvedValueOnce(undefined);

            data.name = 'new name';
            data.description = 'new description';

            return request(app.getHttpServer())
            .put('/products/'+opt1.productId+'/options/'+opt1.id)
            .send(data)
            .expect(200)
            .expect('');
        });

        it('should succeed when no data to update is sent', async () => {
            jest.spyOn(service, 'update').mockResolvedValueOnce(undefined);

            return request(app.getHttpServer())
            .put('/products/'+opt1.productId+'/options/'+opt1.id)
            .send(data)
            .expect(200)
            .expect('');
        });

        it('should return error response when name is empty', async () => {
            data.name = '';
            const error = badRequestError(["name should not be empty"]);

            return request(app.getHttpServer())
            .put('/products/'+opt1.productId+'/options/'+opt1.id)
            .send(data)
            .expect(400)
            .expect(error);
        });

        it('should return error response when description is empty', async () => {
            data.description = '';
            const error = badRequestError(["description should not be empty"]);

            return request(app.getHttpServer())
            .put('/products/'+opt1.productId+'/options/'+opt1.id)
            .send(data)
            .expect(400)
            .expect(error);
        });

        it(`should return error response when product and/or option do not exist`, () => {
            jest.spyOn(service, 'update').mockImplementationOnce(() => { throw new NotFoundException; });

            data.name = 'new name';
            data.description = 'new description';

            return request(app.getHttpServer())
            .put('/products/'+opt1.productId+'/options/'+opt1.id)
            .send(data)
            .expect(404)
            .expect(notFoundError);
        });

        it('should return error response when service raises an unhandled error', async () => {
            jest.spyOn(service, 'update').mockImplementationOnce(() => { throw new InternalServerErrorException; });

            data.name = 'new name';
            data.description = 'new description';

            return request(app.getHttpServer())
            .put('/products/'+opt1.productId+'/options/'+opt1.id)
            .send(data)
            .expect(500)
            .expect(internalServerError);
        });
    });

    describe('/DELETE products/<id>', () => {
        it(`should delete the option when no error`, () => {
            jest.spyOn(service, 'delete').mockResolvedValueOnce(undefined);

            return request(app.getHttpServer())
            .delete('/products/'+opt1.productId+'/options/'+opt1.id)
            .expect(200)
            .expect('');
        });

        it(`should return error response when product and/or option do not exist`, () => {
            jest.spyOn(service, 'delete').mockImplementationOnce(() => { throw new NotFoundException; });

            return request(app.getHttpServer())
            .delete('/products/'+opt1.productId+'/options/'+opt1.id)
            .expect(404)
            .expect(notFoundError);
        });

        it('should return error response when service raises an unhandled error', async () => {
            jest.spyOn(service, 'delete').mockImplementationOnce(() => { throw new InternalServerErrorException; });

            return request(app.getHttpServer())
            .delete('/products/'+opt1.productId+'/options/'+opt1.id)
            .expect(500)
            .expect(internalServerError);
        });
    });


    afterAll(async () => {
        await app.close();
    });
});
