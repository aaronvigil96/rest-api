import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class UpdateBrandDto {
    @IsOptional()
    @IsString()
    @Transform(({value}) => value.toLowerCase())
    name?: string;
}