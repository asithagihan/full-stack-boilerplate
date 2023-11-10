import { Column, Entity, Unique, PrimaryGeneratedColumn } from "typeorm";

export enum Unit {
  ML = "ml",
  PCS = "pcs",
  GRAMS = "g",
}

export enum ItemType {
  FINISHED_PRODUCT = "FINISHED_PRODUCT",
  PACKAGING = "PACKAGING",
  MATERIAL = "MATERIAL",
  MAIN_BATCH = "MAIN_BATCH",
  INPROGRESS_PRODUCT = "INPROGRESS_PRODUCT",
  CONSUMABLE = "CONSUMABLE",
}

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

  @Column()
  public availableQty: number;

  @Column()
  public reorderLevel: number;
}

export default Item;
