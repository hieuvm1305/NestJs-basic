import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';

@Module({
  // Khai báo  Orm của BookEntity
  imports: [TypeOrmModule.forFeature([BookEntity])],
  //   providers: [UserService],
  //   controllers: [UserController],
})
export class BookModule {}
