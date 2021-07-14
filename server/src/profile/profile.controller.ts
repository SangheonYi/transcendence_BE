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

@Controller('profile')
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUsersDto) {
  //   // console.log('create');
  //   return this.usersService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   // console.log('find all');
  //   return this.usersService.findAll();
  // }

  @Get(':myID/:otherID')
  findByIntraId(
    @Param('myID') myID: string,
    @Param('otherID') otherID: string,
  ) {
    console.log('find one intra_id');
    return this.usersService.findProfileById(myID, otherID);
  }

  // @Post('indepen')
  // findOne(@Body() body) {
  //   return this.usersService.findOne(body);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUsersDto) {
  //   // console.log('update');
  //   return this.usersService.update(id, updateUserDto);
  // }

  // @Delete('/clear')
  // clear() {
  //   // console.log('clear');
  //   return this.usersService.clear();
  // }

  // @Delete(':id')
  // remove(@Param('id') nickname: string) {
  //   // console.log('by id delete');
  //   return this.usersService.remove(nickname);
  // }
}
