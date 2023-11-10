export interface IBaseItem {
  sku: string;
  barcode: string;
  name: string;
  availableQty: number;
  reorderLevel: number;
}

export interface IItem extends IBaseItem {
  id: number;
}

export interface PaginatedResult<T> {
  items: T[];
  totalItems: number;
}
