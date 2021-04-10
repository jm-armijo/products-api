import { Test, TestingModule } from '@nestjs/testing';
import { OptionsController } from './options.controller';

describe('OptionsController', () => {
    class OptionsService {
        public async create(
            productId:     string,
            name:          string,
            description:   string,
        ) : Promise<any> {}

        public async getList(productId: string, name: string) : Promise<any> {}
        public async getOne(productId: string, name: string)  : Promise<any> {}
        public async delete(productId: string, name: string)  : Promise<any> {}

        public async update(
            id:            string,
            productId:     string,
            name:          string,
            description:   string,
        ) : Promise<void> {}
    }

    let controller: OptionsController;
    let service:    OptionsService;

    const prodId1 = 'dorp-poiuy-trewq';
    const prodId2 = 'prod-poiuy-trewq';
    const prodId3 = 'prod-poiuy-trewq';

    const opt1 = {
        id:            'zxcvb-mnbvc-lkjhg',
        productId:     prodId1,
        name:          'option1',
        description:   'desc1',
    };

    const opt2 = {
        id:            'zxcvb-mnbvc-lkjhk',
        productId:     prodId2,
        name:          'option2',
        description:   'desc2',
    };

    const opt3 = {
        id:            'zxcvb-mnbvc-lkjhl',
        productId:     prodId2,
        name:          'option3',
        description:   'desc3',
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OptionsController],
            providers:   [OptionsService],
        }).compile();

        controller = module.get<OptionsController>(OptionsController);
        service    = module.get<OptionsService>(OptionsService);
    });

    describe('create', () => {
        const productId     = prodId1;
        const name          = 'option1';
        const description   = 'desc1';

        it('should return the id of the new option', async () => {
            const id = 'zxcvb-mnbvc-lkjhg';
            jest.spyOn(service, 'create').mockResolvedValueOnce(id);

            const actual   = await controller.create(productId, name, description);
            const expected = { id: id };
            expect(actual).toEqual(expected);
        });

        it('should raise error if service throws', async () => {
            jest.spyOn(service, 'create').mockImplementationOnce(() => { throw new Error('An error'); });
            await expect(controller.create(productId, name, description)).rejects.toThrow('An error');
        });

        it('should raise error when name is empty', async () => {
            jest.spyOn(service, 'create').mockImplementationOnce(() => { throw new Error('ValidationError'); });
            await expect(controller.create(productId, name, description)).rejects.toThrow('ValidationError');
        });
    });

    describe('getList', () => {
        it('should return all options when name is undefined', async () => {
            const name  = undefined;
            const list  = [opt2, opt3,];
            jest.spyOn(service, 'getList').mockResolvedValueOnce(list);

            const actual   = await controller.getList(prodId2, name);
            const expected = list
            expect(actual).toEqual(expected);
        });

        it('should return producs filtered by name when name is defined', async () => {
            const name  = 'option2';
            const query = { name: name, };
            const list  = [opt2,];
            jest.spyOn(service, 'getList').mockResolvedValueOnce(list);

            const actual   = await controller.getList(prodId2, name);
            const expected = list
            expect(actual).toEqual(expected);
        });

        it('should return empty list when option name does not exist', async () => {
            const name  = 'badprod';
            const query = { name: name, };
            const list  = [];
            jest.spyOn(service, 'getList').mockResolvedValueOnce(list);

            const actual   = await controller.getList(prodId2, name);
            const expected = list
            expect(actual).toEqual(expected);
        });
    });

    describe('update', () => {
        let   productId   = 'any-product';
        let   id          = 'any-id';
        const name        = 'a name';
        const description = 'a description';

        it('should succeed when option exists', async () => {
            id = 'zxcvb-mnbvc-lkjhg';
            jest.spyOn(service, 'update').mockImplementationOnce( () => { return Promise.resolve(undefined); });
            await expect(controller.update(productId, id, name, description)).resolves.not.toThrow();
        });

        it('should raise error when option does not exist', async () => {
            id = 'no-option-for-this-id';
            jest.spyOn(service, 'update').mockImplementationOnce(() => { throw new Error('CastError'); });
            await expect(controller.update(productId, id, name, description)).rejects.toThrow('CastError');
        });

        it('should raise error when product does not exist', async () => {
            id = 'no-option-for-this-id';
            jest.spyOn(service, 'update').mockImplementationOnce(() => { throw new Error('CastError'); });
            await expect(controller.update(productId, id, name, description)).rejects.toThrow('CastError');
        });

        it('should raise error when service throws', async () => {
            jest.spyOn(service, 'update').mockImplementationOnce(() => { throw new Error('AnyError'); });
            await expect(controller.update(productId, id, name, description)).rejects.toThrow('AnyError');
        });
    });

    describe('delete', () => {
        let productId = 'any-product';

        it('should delete one option when option exists', async () => {
            const id = 'zxcvb-mnbvc-lkjhg';
            jest.spyOn(service, 'delete').mockResolvedValueOnce(opt1);

            const actual   = await controller.delete(productId, id);
            const expected = opt1
            expect(actual).toEqual(expected);
        });

        it('should raise error when option does not exist', async () => {
            const id      = 'no-option-for-this-id';
            const option = {};
            jest.spyOn(service, 'delete').mockResolvedValueOnce(option);

            const actual   = await controller.delete(productId, id);
            const expected = option;
            expect(actual).toEqual(expected);
        });

        it('should raise error when product does not exist', async () => {
            const id      = 'no-option-for-this-id';
            const option = {};
            jest.spyOn(service, 'delete').mockResolvedValueOnce(option);

            const actual   = await controller.delete(productId, id);
            const expected = option;
            expect(actual).toEqual(expected);
        });

        it('should raise error when service throws', async () => {
            const id   = 'bad-id';
            const list = [];

            jest.spyOn(service, 'delete').mockImplementationOnce(() => { throw new Error('CastError'); });
            await expect(controller.delete(productId, id)).rejects.toThrow('CastError');
        });
    });
});
