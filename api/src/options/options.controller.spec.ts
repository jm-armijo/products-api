import { NotFoundException} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { OptionsController } from './options.controller';

import { CreateOptionDto, CreateOptionDataDto, CreateOptionParamsDto } from './dto/create_option_dto';
import { GetOptionDto, GetOptionFilterDto } from './dto/get_option_dto';
import { GetOptionsDto } from './dto/get_options_dto';
import { UpdateOptionDataDto, UpdateOptionFilterDto, UpdateOptionParamsDto } from './dto/update_option_dto';
import { DeleteOptionFilterDto, DeleteOptionParamsDto } from './dto/delete_option_dto';

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
        const params : CreateOptionParamsDto = { productId: 'prodId1' };
        const data : CreateOptionDataDto = { name: opt1.name, description: opt1.description };

        it('should return the id of the new option when the product exists', async () => {
            jest.spyOn(service, 'create').mockResolvedValueOnce(opt1.id);
            await expect(controller.create(params, data)).resolves.toEqual({ id: opt1.id });
        });

        it('should raise error when product does not exist', async () => {
            jest.spyOn(service, 'create').mockImplementationOnce(() => { throw new NotFoundException; });
            await expect(controller.create(params, data)).rejects.toThrow(new NotFoundException);
        });

        it('should raise error when name is empty', async () => {
            jest.spyOn(service, 'create').mockImplementationOnce(() => { throw new Error('ValidationError'); });
            await expect(controller.create(params, data)).rejects.toThrow('ValidationError');
        });
    });

    describe('getList', () => {
        let params : GetOptionsDto = {productId: prodId2};

        it('should return all options when product exists', async () => {
            const list = [opt2, opt3,];
            jest.spyOn(service, 'getList').mockResolvedValueOnce(list);
            await expect(controller.getList(params)).resolves.toEqual(list);
        });

        it('should raise error when product does not exist', async () => {
            jest.spyOn(service, 'getList').mockImplementationOnce(() => { throw new NotFoundException; });
            await expect(controller.getList(params)).rejects.toThrow(new NotFoundException);
        });

        it('should return empty list when products does not have options', async () => {
            const list = [];
            jest.spyOn(service, 'getList').mockResolvedValueOnce(list);
            await expect(controller.getList(params)).resolves.toEqual(list);
        });
    });

    describe('getOne', () => {
        let params : GetOptionDto = {productId: prodId2, id: opt2.id};

        it('should return the matching option when product and option exist', async () => {
            jest.spyOn(service, 'getOne').mockResolvedValueOnce(opt2);
            await expect(controller.getOne(params)).resolves.toEqual(opt2);
        });

        it('should raise error when product and/or option do not exist', async () => {
            jest.spyOn(service, 'getOne').mockImplementationOnce(() => { throw new NotFoundException; });
            await expect(controller.getOne(params)).rejects.toThrow(new NotFoundException);
        });
    });

    describe('update', () => {
        let params : UpdateOptionParamsDto = {productId: prodId1, id: opt1.id};
        let data : UpdateOptionDataDto = { name: 'new name', description: 'new description' };

        it('should update option when product and option exist', async () => {
            jest.spyOn(service, 'update').mockImplementationOnce( () => { return Promise.resolve(undefined); });
            await expect(controller.update(params, data)).resolves.toBeUndefined();
        });

        it('should raise error when product and/or option do not exist', async () => {
            jest.spyOn(service, 'update').mockImplementationOnce(() => { throw new NotFoundException; });
            await expect(controller.update(params, data)).rejects.toThrow(new NotFoundException);
        });

        it('should succeed when no data is updated', async () => {
            data = { name: undefined, description: undefined };
            jest.spyOn(service, 'update').mockImplementationOnce( () => { return Promise.resolve(undefined); });
            await expect(controller.update(params, data)).resolves.toBeUndefined();
        });
    });

    describe('delete', () => {
        let params : UpdateOptionParamsDto = {productId: prodId1, id: opt1.id};

        it('should delete the option when product and option exist', async () => {
            jest.spyOn(service, 'delete').mockImplementationOnce( () => { return Promise.resolve(undefined); });
            await expect(controller.delete(params)).resolves.toBeUndefined();
        });

        it('should raise error when product and/or option do not exist', async () => {
            jest.spyOn(service, 'delete').mockImplementationOnce(() => { throw new NotFoundException; });
            await expect(controller.delete(params)).rejects.toThrow(new NotFoundException);
        });
    });
});
