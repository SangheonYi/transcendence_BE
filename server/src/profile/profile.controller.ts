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
// id에 대응하는 유저 블럭요청
// post profile/block  withcredentials: true

// body: {myID, otherID}
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  findProfileByIntraId(@Query() para) {
    const { myID, otherID } = para;
    return this.profileService.findProfileById(myID, otherID);
  }

  @Post('friend')
  addFriend(@Body() body) {
    const { myID, otherID } = body;
    return this.profileService.addFriend(myID, otherID);
  }

  @Post('block')
  addBlock(@Body() body) {
    const { myID, otherID } = body;
    return this.profileService.addBlock(myID, otherID);
  }

  // behind functions are for develop
  @Get('all')
  findAll() {
    // console.log('find all');
    return this.profileService.findAll();
  }

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
