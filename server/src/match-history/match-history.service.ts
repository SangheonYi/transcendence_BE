import { Injectable } from '@nestjs/common';
import { CreateMatchHistoryDto } from './dto/create-match-history.dto';
import { UpdateMatchHistoryDto } from './dto/update-match-history.dto';
import { MatchHistory } from './entities/match-history.entity';
import { MatchHistoryRepository } from './match-history.repository';

@Injectable()
export class MatchHistoryService {
  constructor(
    private readonly MatchHistoryRepository: MatchHistoryRepository,
  ) {}
  async create(createMatchHistoryDto: CreateMatchHistoryDto) {
    const { p1_id, p2_id, winner } = createMatchHistoryDto;
    const newMatchHistory = this.createMatchHistory(createMatchHistoryDto);
    const result = await this.MatchHistoryRepository.save(newMatchHistory);
    return result;
  }

  async findAll() {
    return await this.MatchHistoryRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} matchHistory`;
  }

  update(id: number, updateMatchHistoryDto: UpdateMatchHistoryDto) {
    return `This action updates a #${id} matchHistory`;
  }

  async clear() {
    return await this.MatchHistoryRepository.clear();
  }

  createMatchHistory(createMatchHistoryDto: CreateMatchHistoryDto) {
    const { p1_id, p2_id, winner } = createMatchHistoryDto;
    let newMatchHistory = new MatchHistory();
    newMatchHistory.p1_id = p1_id;
    newMatchHistory.p2_id = p2_id;
    newMatchHistory.winner = winner;
    return newMatchHistory;
  }
}
