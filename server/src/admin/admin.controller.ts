import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUsersDto } from '../users/dto/create-users.dto';
import { UpdateUsersDto } from '../users/dto/update-users.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUsersDto) {
    // console.log('create');
    return this.usersService.create(createUserDto);
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUsersDto) {
    // console.log('update');
    return this.usersService.update(updateUserDto);
  }

  // below apis are for test
  @Get()
  findAll() {
    // console.log('find all');
    return this.usersService.findAll();
  }

  @Delete('/clear')
  clear() {
    // console.log('clear');
    return this.usersService.clear();
  }

  @Delete(':id')
  remove(@Param('id') nickname: string) {
    // console.log('by id delete');
    return this.usersService.remove(nickname);
  }
}
