// src/items/items.service.ts

/**
 * Data Model Interfaces
 */
import { IBaseItem, IItem, PaginatedResult } from "./item.interface";
import { IItems } from "./items.interface";
import { Repository } from "typeorm";
import { Item } from "./../entity/item";
import { dataSource } from "./../app-data-source";
const itemRepository = dataSource.getRepository(Item);

/**
 * filter, sort , search and paginate items.
 */
export const findAll = async (
  filter: {
    sku?: string;
    barcode?: string;
    name?: string;
    availableQty?: number;
    reorderLevel?: number;
  },
  sort: {
    field: string;
    order: "ASC" | "DESC";
  },
  search: string,
  page: number,
  pageSize: number
): Promise<PaginatedResult<Item>> => {
  // Build the query
  const queryBuilder = itemRepository.createQueryBuilder("item");

  // Add filtering
  if (filter.sku) {
    queryBuilder.andWhere("item.sku LIKE :sku", { sku: `%${filter.sku}%` });
  }

  if (filter.barcode) {
    queryBuilder.andWhere("item.barcode LIKE :barcode", {
      barcode: `%${filter.barcode}%`,
    });
  }

  if (filter.name) {
    queryBuilder.andWhere("item.name LIKE :name", { name: `%${filter.name}%` });
  }

  if (filter.availableQty) {
    queryBuilder.andWhere("item.availableQty >= :availableQty", {
      availableQty: filter.availableQty,
    });
  }

  if (filter.reorderLevel) {
    queryBuilder.andWhere("item.reorderLevel <= :reorderLevel", {
      reorderLevel: filter.reorderLevel,
    });
  }

  // Add sorting
  if (sort.field) {
    queryBuilder.orderBy(sort.field, sort.order);
  }

  // Add search
  if (search) {
    queryBuilder.andWhere(
      "item.sku LIKE :search OR item.barcode LIKE :search OR item.name LIKE :search",
      {
        search: `%${search}%`,
      }
    );
  }

  // Add pagination
  queryBuilder.skip((page - 1) * pageSize).take(pageSize);

  // Get the results
  const [items, totalItems] = await queryBuilder.getManyAndCount();

  // Return the results
  return { items, totalItems };
};

export const find = async (id: number): Promise<IItem> => {
  const item = await itemRepository.findOneBy({
    id,
  });
  return item;
};

export const create = async (newItem: IBaseItem): Promise<IItem> => {
  const item = await itemRepository.save(newItem);
  return item;
};

export const update = async (
  id: number,
  itemUpdate: IBaseItem
): Promise<IItem | null> => {
  console.log("update : ", itemUpdate);
  const item = await itemRepository.save({
    id,
    ...itemUpdate,
  });

  if (!item) {
    return null;
  }

  return item;
};

export const remove = async (id: number): Promise<null | void> => {
  console.log("delete", id);
  const result = await itemRepository.delete(id);
  console.log(result);
  if (!result) {
    return null;
  }
};
