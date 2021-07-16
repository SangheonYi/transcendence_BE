import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Users')
export class UsersEntity {
  @PrimaryColumn()
  intra_id: string;

  @Column()
  nickname: string;

  @Column({ nullable: true })
  state: string;

  @Column()
  icon: string;

  @Column()
  auth_token: string;

  @Column({ nullable: true })
  auth_second: string;

  @Column({ default: 1000 })
  ladder_level: number;

  @Column('simple-array', { nullable: true })
  friend_list: string[];

  @Column('simple-array', { nullable: true })
  match_history: string[];

  @Column('simple-array', { nullable: true })
  block_list: string[];

  @Column('simple-array', { nullable: true })
  chat_room: string[];
}
