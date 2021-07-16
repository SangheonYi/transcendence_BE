import { Module } from '@nestjs/common';
import { MatchHistoryService } from './match-history.service';
import { MatchHistoryController } from './match-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchHistoryRepository } from './match-history.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MatchHistoryRepository])],
  controllers: [MatchHistoryController],
  providers: [MatchHistoryService],
})
export class MatchHistoryModule {}
