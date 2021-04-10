import { PartialType, PickType } from '@nestjs/mapped-types'
import { IsNotEmpty } from 'class-validator';

import { CreateOptionDataDto } from './create_option_dto';
import { GetOptionDto, GetOptionFilterDto } from './get_option_dto';

export class UpdateOptionDataDto extends PartialType(CreateOptionDataDto) {}

export class UpdateOptionFilterDto extends GetOptionFilterDto {}

export class UpdateOptionParamsDto extends GetOptionDto {}
