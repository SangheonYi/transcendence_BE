import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../users/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  controllers: [ProfileController],
  providers: [UsersService],
})
export class ProfileModule {}
