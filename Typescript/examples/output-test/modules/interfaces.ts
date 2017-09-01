// Interfaces

export interface IPerson {
  firstName: string;
  lastName: string;
}

export interface ILoggable {
    log(): void;
}

export interface Action<T, P> {
  type: T;
  payload: P;
}

export interface GetItemsPayload {
  pageSize: number,
  sortOrder: number
}

export interface DeleteItemsPayload {
  itemId: number
}









export interface DeleteItemsActions {
  type: "DeleteItems",
  payload: {
    itemId: number
  }
}
