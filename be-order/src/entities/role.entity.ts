import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('role')
export class Role extends BaseEntity {
  @Column()
  name: string;
}
