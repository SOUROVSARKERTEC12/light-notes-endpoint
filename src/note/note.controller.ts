import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto, ResponseNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiAutoResponse } from 'src/decorators/api-auto-response.decorator';

@Controller('api/notes')
@UseGuards(JwtAuthGuard)
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @ApiAutoResponse(ResponseNoteDto)
  @Post()
  async create(@Body() createNoteDto: CreateNoteDto, @Req() req) {
    const userId = req.user?.sub;
    return this.noteService.create(createNoteDto, userId);
  }

  @ApiAutoResponse(ResponseNoteDto, true)
  @Get()
  async findAll(
    @Req() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    const userId: string = req.user.sub;
    return this.noteService.findAll(userId, page, limit);
  }

  @ApiAutoResponse(ResponseNoteDto)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    const userId: string = req.user.sub;
    return this.noteService.findOne(id, userId);
  }

  @ApiAutoResponse(ResponseNoteDto)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Req() req,
  ) {
    const userId: string = req.user.sub;
    return this.noteService.update(id, updateNoteDto, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    const userId: string = req.user.sub;
    return this.noteService.remove(id, userId);
  }
}
