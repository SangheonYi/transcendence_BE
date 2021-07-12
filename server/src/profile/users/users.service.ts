import { Injectable, Logger } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UsersEntity } from './entities/users.entity';
import { UsersRepository } from './users.repository';
import { AlreadyExistException } from './execptions/already-exist-exception';
import { resourceLimits } from 'worker_threads';
// import { validate } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  private readonly logger = new Logger(UsersService.name);

  existCheck = async (field: string, target: object, value: any) => {
    const result = await this.usersRepository.findOne(target);
    if (result) {
      const error = `${field} dup: ${value} is already exist`;
      throw new AlreadyExistException(error);
    }
    return result;
  };

  async create(createUsersDto: CreateUsersDto) {
    let newUser = new UsersEntity();
    const { intra_id, nickname, auth_token, icon_path } = createUsersDto;
    newUser.intra_id = intra_id;
    newUser.nickname = nickname;
    newUser.auth_token = auth_token;
    newUser.icon_path = icon_path;
    await this.existCheck('intra_id', { intra_id }, intra_id);
    await this.existCheck('nickname', { nickname }, nickname);
    const usersEntity = await this.usersRepository.save(newUser).then((v) => v);
    return usersEntity;
  }

  findAll() {
    return this.usersRepository.find();
  }

  findByIntraId(intra_id: string) {
    return this.usersRepository.findOne({ intra_id });
  }

  findByNickname(nickname: string) {
    return this.usersRepository.findOne({ nickname });
  }

  update(id: number, updateUserDto: UpdateUsersDto) {
    return `This action updates a #${id} user`;
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
    const result = await this.usersRepository
      .query(`DELETE FROM users;`)
      .then((v) => v)
      .catch((error) => {
        console.log('clear faild');
        console.log(error);
      });
    this.logger.debug('is cleard?');
    console.log('is cleard?');
    console.log(result);

    return result;
  }
}
