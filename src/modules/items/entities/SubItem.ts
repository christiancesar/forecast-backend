import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Item from './Item';

@Entity('sub_items')
export default class SubItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column({ name: 'discont_percent' })
  discontPercent: number;

  @Column({ name: 'discont_value' })
  discontValue: number;

  @Column({ name: 'total_price' })
  totalPrice: number;

  @Column()
  comments: string;

  @ManyToOne(() => Item, item => item.subItems)
  @JoinColumn({ name: 'item_id' })
  item: Item;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
