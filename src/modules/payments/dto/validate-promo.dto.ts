import { IsEnum, IsString } from 'class-validator';

export class ValidatePromoDto {
  @IsString()
  code: string;

  @IsEnum(['standard', 'premium'])
  plan: 'standard' | 'premium';
}
