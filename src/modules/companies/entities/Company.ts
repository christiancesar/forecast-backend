// import uploadConfig from '@config/upload';

import Address from '@modules/address/entities/Address';
import User from '@modules/users/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('companies')
export default class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'users_companies',
    joinColumns: [{ name: 'company_id' }],
    inverseJoinColumns: [{ name: 'user_id' }],
  })
  owners: User[];

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'is_headquartes' })
  isHeadquarters: boolean;

  @Column()
  email: string;

  @Column('text', { array: true })
  phones: string[];

  @Column({ name: 'state_registration' })
  stateRegistration: string;

  @Column({ name: 'employer_identification_number' })
  employerIdentificationNumber: string;

  @OneToOne(() => Address, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // constructor() {
  //   if (!this.id) {
  //     this.id = uuid();
  //   }
  // }
}
