import { IsNotEmpty, IsNumber } from 'class-validator';

export class CheckinDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
