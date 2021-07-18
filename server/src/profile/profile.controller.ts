import { Controller, Get, Body, Query, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  findProfileByIntraId(@Query() para) {
    const { myID, otherID } = para;
    return this.profileService.findProfileById(myID, otherID);
  }

  @Put('friend')
  addFriend(@Body() body) {
    const { myID, otherID } = body;
    return this.profileService.addFriend(myID, otherID);
  }

  @Put('block')
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
}
