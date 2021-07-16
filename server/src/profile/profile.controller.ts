import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUsersDto) {
  //   // console.log('create');
  //   return this.profileService.create(createUserDto);
  // }

  @Get()
  findUserById(@Query('intra_id') para: string) {
    // const { intra_id } = para;
    // console.log('find all');
    console.log(para);
    // return this.profileService.findUserById(intra_id);
  }

  @Get()
  findAll() {
    // console.log('find all');
    return this.profileService.findAll();
  }

  @Get(':myID/:otherID')
  findProfileByIntraId(
    @Param('myID') myID: string,
    @Param('otherID') otherID: string,
  ) {
    console.log('find one intra_id');
    return this.profileService.findProfileById(myID, otherID);
  }

  // @Post('indepen')
  // findOne(@Body() body) {
  //   return this.profileService.findOne(body);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUsersDto) {
  //   // console.log('update');
  //   return this.profileService.update(id, updateUserDto);
  // }

  // @Delete('/clear')
  // clear() {
  //   // console.log('clear');
  //   return this.profileService.clear();
  // }

  // @Delete(':id')
  // remove(@Param('id') nickname: string) {
  //   // console.log('by id delete');
  //   return this.profileService.remove(nickname);
  // }
}
