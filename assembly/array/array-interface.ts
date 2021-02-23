export interface IArray<T> {
  size(): i32;
  add(item: T): void;
  insert(item: T, index: i32): void;
  get(index: i32): T;
  remove(index: i32): T;
}
