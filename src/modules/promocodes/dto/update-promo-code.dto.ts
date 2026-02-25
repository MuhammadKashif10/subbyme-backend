import { PartialType } from '@nestjs/mapped-types';
import { CreatePromoCodeDto } from './create-promo-code.dto';
import { IsBoolean, IsDateString, IsEnum, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { PromoDiscountType } from '../schemas/promo-code.schema';

export class UpdatePromoCodeDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  code?: string;

  @IsOptional()
  @IsEnum(PromoDiscountType)
  discountType?: PromoDiscountType;

  @IsOptional()
  @IsNumber()
  @Min(1)
  discountValue?: number;

  @IsOptional()
  @IsDateString()
  expiryDate?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  usageLimit?: number | null;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
