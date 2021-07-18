import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LogInOutController } from './login_out.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../users/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  controllers: [LogInOutController],
  providers: [UsersService],
})
export class LogInOutModule {}
