import { IArray } from './array-interface';

export class DefaultArray<T> implements IArray<T> {
  private array: Array<T | null>;

  constructor(length: i32 = 0) {
    this.array = new Array<T | null>(length);
  }

  public size(): i32 {
    return this.array.length;
  }
  public add(item: T): void {
    this.array.push(item);
  }

  insert(item: T, index: i32): void {
    if (index == 0) {
      this.array.unshift(item);
    } else {
      this.array.push(null);
      this.array.copyWithin(index, index - 1);
      this.array[index] = item;
    }
  }

  @operator('[]')
  get(index: i32): T {
    return this.array[index] as T;
  }

  remove(index: i32): T {
    const deleted = this.array[index] as T;
    this.array.splice(index, 1);
    return deleted;
  }
}
