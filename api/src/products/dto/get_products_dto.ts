import { PartialType, PickType } from '@nestjs/mapped-types'

import { CreateProductDto } from './create_product_dto';

export class GetProductsDto extends PartialType(
    PickType(CreateProductDto, ['name'] as const)
) {}
