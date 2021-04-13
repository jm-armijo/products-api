import { IsMongoId } from 'class-validator';

export class ProductFilterDto {
    @IsMongoId()
    id: string;
}
