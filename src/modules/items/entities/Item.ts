import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
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

  // @OneToMany(() => SubItem, subItem => subItem.item, {
  //   cascade: true,
  //   eager: true,
  // })
  // subItems: SubItem[];

  @ManyToMany(() => SubItem, { eager: true, cascade: true })
  @JoinTable({
    name: 'items_subitems',
    joinColumns: [{ name: 'item_id' }],
    inverseJoinColumns: [{ name: 'sub_item_id' }],
  })
  subItems: SubItem[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
