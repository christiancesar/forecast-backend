import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('address')
export default class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  complement: string;

  @Column()
  reference: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ name: 'state_acronym' })
  stateAcronym: string;

  @Column({ name: 'postal_code' })
  postalCode: string; // pattern: /^\d{5}-?\d{3}$/

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
