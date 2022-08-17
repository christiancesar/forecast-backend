import Company from '@modules/companies/entities/Company';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Item from '@modules/items/entities/Item';
import Payment from '@modules/payments/entities/Payment';
import Transporter from '@modules/transporter/entities/Transporter';

@Entity('budgets')
export default class Budget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'short_id' })
  shortId: string;

  @Column()
  accepted: boolean;

  provider: Company;

  @Column({ name: 'responsible_seller' })
  responsibleSeller: string;

  payments: Payment[];

  transporter: Transporter;

  @Column({ name: 'discont_percent' })
  discontPercent: number;

  @Column({ name: 'discont_value' })
  discontValue: number;

  @Column()
  price: number;

  @Column({ name: 'total_price' })
  totalPrice: number;

  @Column()
  comments: string;

  // @OneToMany(() => SubItem, subItem => subItem.item, {
  //   cascade: true,
  //   eager: true,
  // })
  items: Item[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
