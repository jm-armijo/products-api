import { IsMongoId } from 'class-validator';

export class GetOptionDto {
    @IsMongoId()
    id: string;

    @IsMongoId()
    productId: string;
}

export class GetOptionFilterDto {
    @IsMongoId()
    _id: string;

    @IsMongoId()
    productId: string;

    constructor(params) {
        this._id = params.id;
        this.productId = params.productId;
    }
}
