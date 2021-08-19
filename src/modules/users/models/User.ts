// import uploadConfig from '@config/upload';

import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Address from '@modules/address/models/Address';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  phone: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column()
  email: string;

  @Column({ name: 'individual_tax_number' })
  individualTaxNumber: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @Column({ name: 'confirmed_email' })
  @Exclude()
  confirmedEmail: boolean;

  @OneToOne(() => Address, (address: Address) => address.id, {
    eager: true,
  })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Column({ name: 'address_id' })
  addressId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // @Expose({ name: 'avatar_url' })
  // getAvatarUrl(): string | null {
  //   if (!this.avatar) {
  //     return null;
  //   }

  //   switch (uploadConfig.driver) {
  //     case 'disk':
  //       return `${process.env.APP_API_URL}/files/${this.avatar}`;
  //     case 's3':
  //       return `https://${uploadConfig.config.aws.bucket}.s3.us-east-2.amazonaws.com/${this.avatar}`;
  //     default:
  //       return null;
  //   }
  // }
}
