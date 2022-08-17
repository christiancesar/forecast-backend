import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Methods } from '../types/MethodsEnum';

@Entity('payments')
export default class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'total_amount' })
  totalAmount: number;

  @Column({ type: 'varchar' })
  method: Methods;

  @Column()
  installments: number; // parcelas

  @Column({ name: 'interest_free_at' })
  interestFreeAt: number; // Sem juros até x parcela

  @Column({ name: 'interest_rates' })
  interestRates: number; // Taxa acima do valor interestFreeAt

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
