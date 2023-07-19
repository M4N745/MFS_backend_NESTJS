import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Covers } from '../covers/cover.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Movies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
  @Column()
  description: string;

  @Column()
  cover: number;
}
