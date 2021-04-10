import { IsNotEmpty } from 'class-validator';

export class GetOptionDto {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    productId: string;
}

export class GetOptionFilterDto {
    @IsNotEmpty()
    _id: string;

    @IsNotEmpty()
    productId: string;

    constructor(params) {
        this._id = params.id;
        this.productId = params.productId;
    }
}
