import { Injectable } from '@nestjs/common';
import { CreateMatchHistoryDto } from '../match-history/dto/create-match-history.dto';
import { UpdateMatchHistoryDto } from '../match-history/dto/update-match-history.dto';
import { MatchHistory } from '../match-history/entities/match-history.entity';
import { MatchHistoryService } from '../match-history/match-history.service';
import { UsersService } from '../users/users.service';
import { CreateUsersDto } from '../users/dto/create-users.dto';
import { UpdateUsersDto } from '../users/dto/update-users.dto';

@Injectable()
export class ProfileService {
  constructor(
    private readonly matchHistoryService: MatchHistoryService,
    private readonly usersService: UsersService,
  ) {}
  async findProfileById(myID: string, otherID: string) {}
  async findUserById(intra_id: string) {
    return await this.usersService.findByIntraId(intra_id);
  }

  async findAll() {
    return await this.matchHistoryService.findAll();
  }

  async clear() {
    return await this.matchHistoryService.clear();
  }
}
