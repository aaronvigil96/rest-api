import { Module } from '@nestjs/common';
import { BrandModule } from './brand/brand.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [BrandModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
