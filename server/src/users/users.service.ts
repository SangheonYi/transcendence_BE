import { Injectable, Logger } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UsersEntity } from './entities/users.entity';
import { UsersRepository } from './users.repository';
import { AlreadyExistException } from './execptions/already-exist-exception';
import { NotExistException } from './execptions/not-exist-exception';

// import { validate } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  private readonly logger = new Logger(UsersService.name);

  async create(createUsersDto: CreateUsersDto) {
    let newUser = new UsersEntity();
    const { intra_id, nickname, auth_token, icon } = createUsersDto;
    newUser.intra_id = intra_id;
    newUser.nickname = nickname;
    newUser.auth_token = auth_token;
    newUser.icon = icon;
    newUser.friend_list = ['taekim', 'jinkim'];
    await this.duplicateCheck('intra_id', { intra_id }, intra_id);
    await this.duplicateCheck('nickname', { nickname }, nickname);
    const usersEntity = await this.usersRepository.save(newUser).then((v) => v);
    return usersEntity;
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findByIntraId(intra_id: string) {
    return await this.existCheck('intra_id', { intra_id }, intra_id);
  }

  async findByNickname(nickname: string) {
    return await this.usersRepository.findOne({ nickname });
  }

  async update(updateUserDto: UpdateUsersDto) {
    const { intra_id } = updateUserDto;
    await this.existCheck('intra_id', { intra_id }, intra_id);
    const updateResult = this.usersRepository.update(intra_id, updateUserDto);
    return updateResult;
  }

  async remove(nickname: string) {
    const byNick = await this.usersRepository.findOne({
      nickname: 'intra_dup',
    });
    console.log(byNick);
    const byID = await this.usersRepository.findOne({
      intra_id: 'sayi intra id',
    });
    console.log(byID);
    const result = await this.usersRepository.delete(nickname).then((v) => v);
    console.log(result);
    return result;
  }

  async clear() {
    await this.usersRepository.clear();
    return 'clear';
  }

  duplicateCheck = async (field: string, target: object, value: string) => {
    const result = await this.usersRepository.findOne(target);
    if (result) {
      const error = `${field}: ${value} is already exist`;
      throw new AlreadyExistException(error);
    }
    return result;
  };

  existCheck = async (field: string, target: object, value: string) => {
    const result = await this.usersRepository.findOne(target);
    if (result == undefined) {
      const error = `${field}: ${value} is not exist`;
      throw new NotExistException(error);
    }
    return result;
  };
}
