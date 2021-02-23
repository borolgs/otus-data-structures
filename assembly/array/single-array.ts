import { IArray } from './array-interface';

export class SingleArray<T> implements IArray<T> {
  private array: StaticArray<T>;

  constructor() {
    this.array = new StaticArray<T>(0);
  }

  public size(): i32 {
    return this.array.length;
  }

  public add(item: T): void {
    this.resize();
    this.array[this.size() - 1] = item;
  }

  insert(item: T, index: i32): void {
    if (index < 0 || index > this.size() - 1) throw new RangeError('Index out of range');
    this.resize();
    for (let i = this.array.length - 1; i > index; i--) {
      unchecked((this.array[i] = this.array[i - 1]));
    }
    this.array[index] = item;
  }

  @operator('[]')
  get(index: i32): T {
    return this.array[index];
  }

  remove(index: i32): T {
    if (index > this.size() - 1) throw new RangeError('Index out of range');
    const deleted = this.array[index];

    const newArray = new StaticArray<T>(this.array.length - 1);
    let count = 0;
    for (let i = 0; i < this.size(); i++) {
      if (i == index) {
        continue;
      }
      unchecked((newArray[count] = this.array[i]));
      count++;
    }

    this.array = newArray;

    return deleted;
  }

  private resize(): void {
    const newArray = new StaticArray<T>(this.array.length + 1);
    for (let i = 0; i < this.array.length; i++) {
      unchecked((newArray[i] = this.array[i]));
    }
    this.array = newArray;
  }

  toString(): string {
    return this.array.toString() + ', length: ' + this.array.length.toString();
  }
}
