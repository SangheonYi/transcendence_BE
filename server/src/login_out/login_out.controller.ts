import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUsersDto } from '../users/dto/create-users.dto';
import { UpdateUsersDto } from '../users/dto/update-users.dto';

@Controller('log')
export class LogInOutController {
  constructor(private readonly usersService: UsersService) {}

  @Get('in')
  findAll() {
    // console.log('find all');
    // return this.usersService.findAll();
  }

  @Post('in')
  create(@Body() createUserDto: CreateUsersDto) {
    // console.log('create');
    // return this.usersService.create(createUserDto);
  }

  @Patch('out')
  update(@Body() updateUserDto) {
    // console.log('update');
    // return this.usersService.update(updateUserDto);
  }

  // below apis are for test
}
