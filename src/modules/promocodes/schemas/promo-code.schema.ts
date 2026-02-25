import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type PromoCodeDocument = HydratedDocument<PromoCode>;

export enum PromoDiscountType {
  PERCENTAGE = 'percentage',
  FREE_TIME = 'free_time',
}

@Schema({ timestamps: true, collection: 'promocodes' })
export class PromoCode {
  @Prop({ required: true, trim: true, uppercase: true, unique: true, index: true })
  code: string;

  @Prop({ required: true, enum: PromoDiscountType })
  discountType: PromoDiscountType;

  @Prop({ required: true, min: 0 })
  discountValue: number;

  @Prop({ required: true })
  expiryDate: Date;

  @Prop({ type: Number, default: null, min: 1 })
  usageLimit: number | null;

  @Prop({ default: 0, min: 0 })
  usedCount: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  createdBy: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

export const PromoCodeSchema = SchemaFactory.createForClass(PromoCode);

PromoCodeSchema.index({ code: 1 });
PromoCodeSchema.index({ isActive: 1, expiryDate: 1 });
