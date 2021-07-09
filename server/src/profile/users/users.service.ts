import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UsersEntity } from './entities/users.entity';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

@Injectable()
export class UsersService {
  private static readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async create(createUsersDto: CreateUsersDto): Promise<UsersEntity> {
    // let newUser = new UsersEntity();
    // newUser.intra_id = createUsersDto.intra_id;
    // newUser.nickname = createUsersDto.nickname;
    // newUser.auth_token = createUsersDto.auth_token;
    // newUser.icon_path = createUsersDto.icon_path;
    // // const validate_error = await validate(newUser);
    // // if (validate_error.length > 0) {
    // //   const _error = { username: 'UserInput is not valid check type' };
    // //   throw new HttpException(
    // //     { message: 'Input data validation failed', _error },
    // //     HttpStatus.BAD_REQUEST,
    // //   );
    // // } else {}
    // const usersEntity = await this.usersRepository.save(newUser).then((v) => v);
    try {
      const result = await this.usersRepository.save(createUsersDto);
      UsersService.logger.debug(result);
      return result;
    } catch (error) {
      UsersService.logger.debug(error);
      throw error;
    }
    // return usersEntity;
  }

  findAll(): Promise<UsersEntity[]> {
    return this.usersRepository.find();
  }

  async findOne(intra_id: number): Promise<UsersEntity> {
    const usersEntity = await this.usersRepository
      .findOne(intra_id)
      .then((v) => v);
    console.log(usersEntity);
    return usersEntity;
  }

  async update(updateUserDto: UpdateUsersDto) {
    return `This action updates a #${updateUserDto.intra_id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
