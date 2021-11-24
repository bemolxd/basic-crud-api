import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from './user.entity';

@Entity('friend_request')
export class FriendRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  recipientId: number;
  @ManyToOne(() => User, (user) => user.incomingFriendRequests)
  @JoinColumn({ name: 'recipientId' })
  recipient: User;

  @Column()
  senderId: number;
  @ManyToOne(() => User, (user) => user.outgoingFriendRequests)
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: string;
}
