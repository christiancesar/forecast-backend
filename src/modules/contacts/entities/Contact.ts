import Company from '@modules/companies/entities/Company';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('contacts')
export default class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Company, company => company.id, { cascade: true })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column('text', { array: true })
  phones: string[];

  @Column({ name: 'state_registration' })
  stateRegistration: string;

  @Column({ name: 'employer_identification_number' })
  employerIdentificationNumber: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
