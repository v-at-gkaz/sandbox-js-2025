import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiService } from './api.service';
import { CreateGameDto } from '../database/dto/create-game.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/rbac/roles.guard';
import { Roles } from '../auth/rbac/roles.decorator';
import { Role } from '../auth/rbac/role.enum';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('game/new')
  createGame(@Request() req: any, @Body() createGameDto: CreateGameDto) {
    const userId: number = req.user.id;
    return this.apiService.createGame(createGameDto, userId);
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('game/list')
  getGames(@Request() req: any) {
    const userId = req.user.id;
    return this.apiService.getGames(userId);
  }

  @Get()
  findAll() {
    return this.apiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApiDto: any) {
    return this.apiService.update(+id, updateApiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apiService.remove(+id);
  }
}
