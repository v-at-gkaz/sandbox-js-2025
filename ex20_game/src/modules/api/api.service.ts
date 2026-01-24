import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from '../database/dto/create-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameEntity } from '../database/entities/game.entity';
import { UserEntity } from '../database/entities/user.entity';

@Injectable()
export class ApiService {
  constructor(
    @InjectRepository(GameEntity)
    private gameRepository: Repository<GameEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async createGame(createGameDto: CreateGameDto, userId: number) {
    const foundUser = await this.usersRepository.findOneBy({
      login: createGameDto.opponentLogin,
    });

    const currentUser = await this.usersRepository.findOneBy({
      id: userId,
    });

    if (!foundUser || !currentUser) {
      throw new NotFoundException();
    }

    return this.gameRepository.save(
      this.gameRepository.create({
        name: createGameDto.name,
        firstGamer: currentUser,
        secondGamer: foundUser,
      }),
    );
  }

  async getGames(userId: number) {
    const gamer = await this.usersRepository.findOne({ where: { id: userId } });

    if (!gamer) {
      throw new NotFoundException();
    }

    return this.gameRepository.find({
      where: [{ firstGamer: gamer }, { secondGamer: gamer }],
    });
  }

  create(createApiDto: any) {
    return 'This action adds a new api';
  }

  findAll() {
    return `This action returns all api`;
  }

  findOne(id: number) {
    return `This action returns a #${id} api`;
  }

  update(id: number, updateApiDto: any) {
    return `This action updates a #${id} api`;
  }

  remove(id: number) {
    return `This action removes a #${id} api`;
  }
}
