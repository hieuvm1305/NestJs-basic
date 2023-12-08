import { Entity, Column, BeforeInsert } from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';
import { BaseModel } from 'src/base.enity';
import { Exclude } from 'class-transformer';
@Entity('user')
export class UserEntity extends BaseModel {
  @Column({ length: 256 })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ default: '' })
  image: string;

  @Column()
  @Exclude() // hide field này khi trả về response
  password: string;

  @Column({ default: false })
  @Exclude()
  is_superuser: boolean;

  @Column({ default: false })
  @Exclude() // hide field này khi trả về response
  is_active: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
}
