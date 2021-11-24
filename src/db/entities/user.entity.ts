import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FriendRequest } from './friendRequest.entity';
import { Post } from './post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  username: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @OneToMany(() => Post, (task) => task.author, { nullable: true })
  posts: Post[];

  @OneToMany(() => FriendRequest, (fr) => fr.recipientId, { nullable: true })
  incomingFriendRequests: FriendRequest[];

  @OneToMany(() => FriendRequest, (fr) => fr.senderId, { nullable: true })
  outgoingFriendRequests: FriendRequest[];

  @Column('text', { nullable: true, array: true, default: [] })
  friendsIds: string[];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: string;
}
