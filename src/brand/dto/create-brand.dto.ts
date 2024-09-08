import { Transform } from "class-transformer";
import { IsString } from "class-validator";

export class CreateBrandDto {
    @IsString()
    @Transform(({value}) => value.toLowerCase())
    readonly name: string;
}