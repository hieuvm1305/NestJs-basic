import { Entity, Column, BeforeInsert } from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';
import { BaseModel } from 'src/base.enity';
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
  password: string;

  @Column({ default: false })
  is_superuser: boolean;

  @Column({ default: false })
  is_active: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}
