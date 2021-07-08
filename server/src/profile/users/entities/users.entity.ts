import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  intra_id: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  state: string;

  @Column()
  icon_path: string;

  @Column()
  auth_token: string;

  @Column({ nullable: true })
  auth_second: string;

  @Column({ default: 1000 })
  ladder_level: number;

  @Column("simple-array", { nullable: true })
  friend_list: string[];

  @Column("simple-array", { nullable: true })
  match_history: string[];

  @Column("simple-array", { nullable: true })
  block_list: string[];

  @Column("simple-array", { nullable: true })
  chat_room: string[];
}
