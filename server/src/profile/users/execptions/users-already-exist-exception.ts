import { BadRequestException } from "@nestjs/common";

export class UsersAlreadyExistException extends BadRequestException {
  constructor(error?: string) {
    super("Users already exist", error);
  }
}
