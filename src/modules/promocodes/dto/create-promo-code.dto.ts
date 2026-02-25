import {
  IsString,
  IsEnum,
  IsNumber,
  Min,
  IsDateString,
  IsOptional,
  IsBoolean,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PromoDiscountType } from '../schemas/promo-code.schema';

export class CreatePromoCodeDto {
  @IsString()
  @MinLength(2, { message: 'Code must be at least 2 characters' })
  @MaxLength(50, { message: 'Code must not exceed 50 characters' })
  code: string;

  @IsEnum(PromoDiscountType)
  discountType: PromoDiscountType;

  @IsNumber()
  @Min(1, { message: 'Discount value must be at least 1' })
  discountValue: number;

  @IsDateString()
  expiryDate: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  usageLimit?: number | null;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
