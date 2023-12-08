import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { BookEntity } from './book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) {}

  async create(requestBody: any) {
    const data = {
      ...requestBody,
      created_at: new Date(),
      modified_at: new Date(),
    };
    const book = this.bookRepository.create(data);
    return this.bookRepository.save(book);
  }

  async findAll() {
    const bookDatas = await this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author')
      .addSelect(
        "CONCAT(author.firstname, ' ', author.lastname)",
        'authorFullName',
      )
      .getMany();

    // Transform the result to the desired format
    return bookDatas.map(book => ({
      title: book.title,
      price: book.price,
      author: book.authorFullName, // Access the dynamically added field
    }));
  }
}
