import { Entity, Column, JoinColumn } from 'typeorm';
import { BaseModel } from 'src/base.enity';
import { ManyToOne } from 'typeorm';
import { UserEntity } from 'src/user/user.enity';
@Entity('book')
export class BookEntity extends BaseModel {
  @Column({ length: 256 })
  title: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: 0 })
  price: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  author: UserEntity;
  authorFullName: any;
}
