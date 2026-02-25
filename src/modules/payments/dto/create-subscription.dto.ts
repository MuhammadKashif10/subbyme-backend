import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateSubscriptionDto {
  @IsEnum(['standard', 'premium'])
  plan: 'standard' | 'premium';

  @IsOptional()
  @IsString()
  promoCodeId?: string;
}
