import { IsDate } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @IsDate()
  created_at: Date;

  @Column({ nullable: true })
  @IsDate()
  modified_at: Date;
}
