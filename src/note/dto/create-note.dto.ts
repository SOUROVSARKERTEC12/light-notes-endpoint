import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  IsDate,
} from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;
}

export class ResponseNoteDto {
  @IsUUID()
  id: string;
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsDate()
  createdAt: Date;
  @IsDate()
  updateAt: Date;
}
