import {
  Entity,
  Column,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { Car } from './Car';
import { Specification } from './Specification';

@Entity('specifications_cars')
class SpecificationCars {
  @OneToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @Column({ type: 'uuid', primary: true })
  car_id: string;

  @OneToOne(() => Specification)
  @JoinColumn({ name: 'specification_id' })
  specification: Specification;

  @Column({ type: 'uuid', primary: true })
  specification_id: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;
}

export { SpecificationCars };
