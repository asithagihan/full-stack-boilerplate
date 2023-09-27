import {
  Column,
  Entity,
  Unique,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class BomItem {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public item_id: number;

  @Column()
  public bom_id: number;

  @Column()
  public qty: string;
}
