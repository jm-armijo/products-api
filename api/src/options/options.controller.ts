import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Put,
    Post,
    Query,
} from '@nestjs/common';

import { OptionsService } from './options.service';

@Controller('products/:productId')
export class OptionsController {
    constructor(private readonly service: OptionsService) {}

    @Post('options')
    async create(
        @Param('productId') productId: string,
        @Body('name')          name:          string,
        @Body('description')   description:   string,
    ) {
        const id = await this.service.create(
            productId,
            name,
            description,
        );

        return { id: id };
    }

    @Get('options')
    async getList(
        @Param('productId') productId: string,
        @Query('name')      name:      string,
    ) {
        return await this.service.getList(productId, name);
    }

    @Put('options/:id')
    async update(
        @Param('productId')  productId:     string,
        @Param('id')         id:            string,
        @Body('name')        name:          string,
        @Body('description') description:   string,
    ) {
        return await this.service.update(
            id,
            productId,
            name,
            description,
        );
    }

    @Delete('options/:id')
    async delete(
        @Param('productId') productId: string,
        @Param('id')        id:        string,
    ) {
        return await this.service.delete(id, productId);
    }
}
