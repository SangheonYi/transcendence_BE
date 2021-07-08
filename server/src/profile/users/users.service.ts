import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UsersEntity } from './entities/users.entity';
import { UsersRepository } from './users.repository';
// import { validate } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async create(createUsersDto: CreateUsersDto) {
    let newUser = new UsersEntity();
    newUser.intra_id = createUsersDto.intra_id;
    newUser.nickname = createUsersDto.nickname;
    newUser.auth_token = createUsersDto.auth_token;
    newUser.icon_path = createUsersDto.icon_path;
    // const validate_error = await validate(newUser);
    // if (validate_error.length > 0) {
    //   const _error = { username: 'UserInput is not valid check type' };
    //   throw new HttpException(
    //     { message: 'Input data validation failed', _error },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // } else {}
    const usersEntity = await this.usersRepository.save(newUser).then((v) => v)
    console.log("✅users created: ")
    console.log(usersEntity)
    return 'This action adds a new user';
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUsersDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
