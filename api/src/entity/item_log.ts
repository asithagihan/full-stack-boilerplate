import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ItemLog {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public item_id: string;

  @Column()
  public quantity: number;

  @Column()
  public user: string;
}

export default ItemLog;
