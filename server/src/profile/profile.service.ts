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
  async findProfileById(myID: string, otherID: string) {
    let profile = { list: [], friend: false, block: false, win: 0, lose: 0 };
    const { friend_list, block_list } = await this.usersService.findByIntraId(
      myID,
    );
    const { match_history } = await this.usersService.findByIntraId(otherID);

    profile.friend = this.nullCheckInclude(friend_list, otherID);
    profile.block = this.nullCheckInclude(block_list, otherID);
    profile.list = match_history;
    return profile;
  }

  async findUserById(intra_id: string) {
    return await this.usersService.findByIntraId(intra_id);
  }

  async findAll() {
    const users = await this.usersService.findAll();
    const history = await this.matchHistoryService.findAll();
    return { users, history };
  }

  async clear() {
    return await this.matchHistoryService.clear();
  }

  nullCheckInclude(list: string[], intra_id: string): boolean {
    if (list) return list.includes(intra_id);
    return false;
  }
}
