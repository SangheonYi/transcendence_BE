import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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

  @Get()
  findAll() {
    // console.log('find all');
    return this.usersService.findAll();
  }

  @Get(':id')
  findByIntraId(@Param('id') intra_id: string) {
    // console.log('find one intra_id');
    return this.usersService.findByIntraId(intra_id);
  }

  @Post('indepen')
  findOne(@Body() body) {
    return this.usersService.findOne(body);
  }

  @Patch(':intra_id')
  update(
    @Param('intra_id') intra_id: string,
    @Body() updateUserDto: UpdateUsersDto,
  ) {
    // console.log('update');
    return this.usersService.update(intra_id, updateUserDto);
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
