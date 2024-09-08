import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";

@Injectable()
export class BrandService {

    constructor(private readonly prisma:PrismaService){}

    async getAllBrands(paginationDto:PaginationDto){

        const {limit = 10, offset = 0} = paginationDto;

        return await this.prisma.brand.findMany({
            skip: offset,
            take: limit,
        });
    }

    async getBrandById(id: string){
        try{
            const brand = await this.prisma.brand.findUnique({
                where: {
                    id
                }
            });

            if(!brand) throw new BadRequestException('The brand with that id was not found');

            return brand; 
        }catch(error){
            this.handleExceptions(error);
        }
    }

    async createBrand(createBrandDto:CreateBrandDto){
        try {
            const brand = await this.prisma.brand.create({
                data: {
                    ...createBrandDto
                },
                select: {
                    name: true
                }
            });

            return brand;
        }catch(error){
            this.handleExceptions(error)
        }
    }

    async updateBrand(id:string, updateBrandDto:UpdateBrandDto){
        try{
            const brand = await this.prisma.brand.update({
                data: {
                    name: updateBrandDto.name
                },
                where: {
                    id
                }
            })

            return brand;
        }catch(error){
            this.handleExceptions(error);
        }
    }

    async deleteBrandById(id: string){
        try{
            await this.prisma.brand.delete({
                where: {
                    id
                }
            })
        }catch(error){
            this.handleExceptions(error);
        }
    }

    private handleExceptions(error:any) {
        
        if(error.code == 'P2025') throw new BadRequestException('The brand with that id was not found')
        if(error.code == 'P2002') throw new BadRequestException('That brand is already created');
        if(error.status == 400) throw new BadRequestException('The brand with that id was not found');

        throw new InternalServerErrorException('Unexpected error, check server logs');
    }
}