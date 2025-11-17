import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NoteService {
  constructor(private readonly prismaService: PrismaService) {}

  // Create note
  async create(createNoteDto: CreateNoteDto, userId: string) {
    return this.prismaService.note.create({
      data: { ...createNoteDto, userId },
    });
  }

  // Get all notes for authenticated user
  async findAll(userId: string) {
    return this.prismaService.note.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Get a single note — ensure owner
  async findOne(id: string, userId: string) {
    const note = await this.prismaService.note.findUnique({
      where: { id },
    });

    if (!note) throw new NotFoundException('Note not found');
    if (note.userId !== userId)
      throw new ForbiddenException('Unauthorized access');

    return note;
  }

  // Update a note — ensure owner
  async update(id: string, dto: UpdateNoteDto, userId: string) {
    // check owner
    const note = await this.findOne(id, userId);

    return this.prismaService.note.update({
      where: { id: note.id },
      data: dto,
    });
  }

  // Delete a note — ensure owner
  async remove(id: string, userId: string) {
    const note = await this.findOne(id, userId);

    return this.prismaService.note.delete({
      where: { id: note.id },
    });
  }
}
