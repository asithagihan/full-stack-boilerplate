// src/items/items.service.ts

/**
 * Data Model Interfaces
 */
import {
  ICreateItem,
  IItem,
  IItemRequest,
  IUpdateItem,
  PaginatedResult,
} from "../../entity/items/item.interface";
import { Item } from "../../entity/items/item.repository";
import { dataSource } from "../../app-data-source";
const itemRepository = dataSource.getRepository(Item);

/**
 * filter, sort , search and paginate items.
 */
export const findAll = async (
  itemRequest: IItemRequest
): Promise<PaginatedResult<Item>> => {
  // Build the query
  const queryBuilder = itemRepository.createQueryBuilder("item");

  // Add filtering
  if (itemRequest.filter.sku) {
    queryBuilder.andWhere("item.sku LIKE :sku", {
      sku: `%${itemRequest.filter.sku}%`,
    });
  }

  if (itemRequest.filter.barcode) {
    queryBuilder.andWhere("item.barcode LIKE :barcode", {
      barcode: `%${itemRequest.filter.barcode}%`,
    });
  }

  if (itemRequest.filter.name) {
    queryBuilder.andWhere("item.name LIKE :name", {
      name: `%${itemRequest.filter.name}%`,
    });
  }

  if (itemRequest.filter.availableQty) {
    queryBuilder.andWhere("item.availableQty >= :availableQty", {
      availableQty: itemRequest.filter.availableQty,
    });
  }

  if (itemRequest.filter.reorderLevel) {
    queryBuilder.andWhere("item.reorderLevel <= :reorderLevel", {
      reorderLevel: itemRequest.filter.reorderLevel,
    });
  }

  // Add sorting
  if (itemRequest.sort.field) {
    queryBuilder.orderBy(itemRequest.sort.field, itemRequest.sort.order);
  }

  // Add search
  if (itemRequest.search) {
    queryBuilder.andWhere(
      "item.sku LIKE :search OR item.barcode LIKE :search OR item.name LIKE :search",
      {
        search: `%${itemRequest.search}%`,
      }
    );
  }

  // Add pagination
  queryBuilder
    .skip((itemRequest.page - 1) * itemRequest.pageSize)
    .take(itemRequest.pageSize);

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

export const create = async (newItem: ICreateItem): Promise<IItem> => {
  const item = await itemRepository.save(newItem);
  return item;
};

export const update = async (
  id: number,
  itemUpdate: IUpdateItem
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
