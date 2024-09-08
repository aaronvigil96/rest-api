import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from "@nestjs/common";
import { BrandService } from "./brand.service";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";

@Controller('brands')
export class BrandController {

    constructor(private readonly brandService:BrandService){}

    @Get()
    getAllBrands(@Query() paginationDto:PaginationDto){
        return this.brandService.getAllBrands(paginationDto);
    }

    @Get(':id')
    getBrandById(@Param('id', ParseUUIDPipe) id: string){
        return this.brandService.getBrandById(id);
    }

    @Post()
    createBrand(@Body() createBrandDto:CreateBrandDto){
        return this.brandService.createBrand(createBrandDto);
    }

    @Patch(':id')
    updateBrand(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateBrandDto:UpdateBrandDto
    ){
        return this.brandService.updateBrand(id, updateBrandDto);
    }

    @Delete(':id')
    deleteBrand(
        @Param('id', ParseUUIDPipe) id: string
    ){
        return this.brandService.deleteBrandById(id);
    }
}