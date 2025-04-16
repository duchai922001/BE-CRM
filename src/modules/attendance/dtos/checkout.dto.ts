import { IsNotEmpty, IsNumber } from 'class-validator';

export class CheckoutDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
