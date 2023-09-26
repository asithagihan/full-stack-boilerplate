import { Column, Entity, Unique, PrimaryGeneratedColumn } from "typeorm";

@Unique("item_sku_constraint", ["sku"])
@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public sku: string;

  @Column()
  public barcode: string;

  @Column()
  public name: string;
}

export default Item;
