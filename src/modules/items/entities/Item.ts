import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import SubItem from './SubItem';

@Entity('items')
export default class Item {
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

  @OneToMany(() => SubItem, subItem => subItem.item, {
    cascade: true,
    eager: true,
  })
  subItems: SubItem[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
