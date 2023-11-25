export interface IBaseItem {
  sku: string;
  barcode: string;
  name: string;
  availableQty: number;
  reorderLevel: number;
}

export interface IItemFilter {
  sku?: string;
  barcode?: string;
  name?: string;
  availableQty?: number;
  reorderLevel?: number;
}

enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export interface IItemSort {
  field: string;
  order: SortOrder;
}

export interface IItemRequest {
  filter: IItemFilter;
  sort: IItemSort;
  search: string;
  page: number;
  pageSize: number;
}

export interface ICreateItem extends IBaseItem {}

export interface IUpdateItem extends IBaseItem {}

export interface IItem extends IBaseItem {
  id: number;
}

export interface PaginatedResult<T> {
  items: T[];
  totalItems: number;
}
