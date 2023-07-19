import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Covers {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  path: string;
}
