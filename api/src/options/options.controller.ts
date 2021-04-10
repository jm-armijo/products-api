import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Put,
    Post,
} from '@nestjs/common';

import { OptionsService } from './options.service';

import { CreateOptionDto, CreateOptionDataDto, CreateOptionParamsDto } from './dto/create_option_dto';
import { GetOptionDto, GetOptionFilterDto } from './dto/get_option_dto';
import { GetOptionsDto } from './dto/get_options_dto';
import { UpdateOptionDataDto, UpdateOptionFilterDto, UpdateOptionParamsDto } from './dto/update_option_dto';
import { DeleteOptionFilterDto, DeleteOptionParamsDto } from './dto/delete_option_dto';

@Controller('products/:productId')
export class OptionsController {
    constructor(private readonly service: OptionsService) {}

    @Post('options')
    async create(@Param() params: CreateOptionParamsDto, @Body() data: CreateOptionDataDto) {
        const merged_data = new CreateOptionDto(params, data);
        const id = await this.service.create(merged_data);
        return { id: id };
    }

    @Get('options')
    async getList(@Param() params: GetOptionsDto) {
        return await this.service.getList(params);
    }

    @Get('options/:id')
    async getOne(@Param() params : GetOptionDto) {
        const filter = new GetOptionFilterDto(params);
        return await this.service.getOne(filter);
    }

    @Put('options/:id')
    async update(@Param() params: UpdateOptionParamsDto, @Body() data: UpdateOptionDataDto) {
        const filter = new UpdateOptionFilterDto(params);
        return await this.service.update(filter, data);
    }

    @Delete('options/:id')
    async delete(@Param() params: DeleteOptionParamsDto) {
        const filter = new DeleteOptionFilterDto(params);
        return await this.service.delete(filter);
    }
}
