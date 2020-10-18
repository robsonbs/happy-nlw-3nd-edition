import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import ColumnNumericTransformer from '../utils/transformers/ColumnNumericTransformer';
import Image from './Image';

@Entity('orphanages')
export default class Orphanage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ transformer: new ColumnNumericTransformer() })
  latitude: number;

  @Column({ transformer: new ColumnNumericTransformer() })
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  open_on_weekends: boolean;

  @OneToMany(() => Image, image => image.orphanage, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  images: Image[];
}
