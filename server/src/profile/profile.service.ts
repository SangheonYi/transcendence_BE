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
    const { friend_list, block_list } = await this.usersService.findByIntraId(
      myID,
    );
    const friend = this.nullCheckInclude(friend_list, otherID);
    const block = this.nullCheckInclude(block_list, otherID);
    const profile = await this.checkWin(otherID);

    return { ...profile, friend, block };
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

  async checkWin(intra_id: string) {
    let profile = { list: [], win: 0, lose: 0 };
    const total_history = await this.matchHistoryService.findById(intra_id);

    if (total_history) {
      let count = 5;
      for (let index = total_history.length - 1; index >= 0; index--) {
        const { p1_id, p2_id, winner } = total_history[index];
        let win = false;
        if (winner === intra_id) {
          profile.win++;
          win = true;
        }
        if (count-- > 0) profile.list.push({ p1_id, p2_id, win });
      }
      profile.lose = total_history.length - profile.win;
    }
    return profile;
  }
}
