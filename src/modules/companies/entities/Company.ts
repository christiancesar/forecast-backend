// import uploadConfig from '@config/upload';

import Address from '@modules/address/entities/Address';
import Contact from '@modules/contacts/entities/Contact';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('companies')
export default class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @ManyToMany(() => Address, { eager: true, cascade: true })
  @JoinTable({
    name: 'companies_address',
    joinColumns: [{ name: 'company_id' }],
    inverseJoinColumns: [{ name: 'address_id' }],
  })
  address: Address;

  @OneToMany(() => Contact, contacts => contacts.company, {
    eager: true,
  })
  @JoinColumn({ name: 'company_id' })
  contacts: Contact;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
