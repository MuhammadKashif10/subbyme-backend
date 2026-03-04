import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional, IsMongoId } from 'class-validator';
import { CreateListingDto } from './create-listing.dto';
import { ListingStatus } from '../schemas/listing.schema';

export class UpdateListingDto extends PartialType(CreateListingDto) {
  @IsEnum(ListingStatus)
  @IsOptional()
  status?: ListingStatus;

  @IsMongoId()
  @IsOptional()
  assignedContractorId?: string;
}
