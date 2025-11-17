import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;
}
