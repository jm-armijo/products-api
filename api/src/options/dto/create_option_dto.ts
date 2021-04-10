import { IsNotEmpty } from 'class-validator';
import { PickType } from '@nestjs/mapped-types'

import { GetOptionDto } from './get_option_dto';

export class CreateOptionDto {
    @IsNotEmpty()
    productId: string

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    constructor(params, data) {
        this.productId = params.productId;
        this.name = data.name;
        this.description = data.description;
    }
}

export class CreateOptionDataDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;
}

export class CreateOptionParamsDto extends PickType(GetOptionDto, ['productId'] as const) {}
