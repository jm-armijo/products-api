import { IsNotEmpty, Min } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @Min(0)
    price: number;

    @Min(0)
    deliveryPrice: number;    
}
