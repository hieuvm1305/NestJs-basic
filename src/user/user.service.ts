import {
  ClassSerializerInterceptor,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.enity';
@Injectable() // đánh dấu class là Provider
export class UserService {
  // khai báo entity constructor
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(): Promise<any> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async create(requestBody: any) {
    const data = {
      ...requestBody,
      created_at: new Date(),
      modified_at: new Date(),
      is_active: true,
    };
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
