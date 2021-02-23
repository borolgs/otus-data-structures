import { IArray } from './array-interface';

export class VectorArray<T> implements IArray<T> {
  private array: StaticArray<T>;
  private vector: i32;
  private _size: i32;

  constructor(vector: i32 = 100) {
    this.vector = vector;
    this.array = new StaticArray<T>(0);
    this._size = 0;
  }

  public size(): i32 {
    return this._size;
  }

  public add(item: T): void {
    this.increase();
    this.array[this._size] = item;
    this._size++;
  }

  insert(item: T, index: i32): void {
    if (index < 0 || index > this._size - 1) throw new RangeError('Index out of range');
    this.increase();
    for (let i = this._size; i > index; i--) {
      unchecked((this.array[i] = this.array[i - 1]));
    }
    this.array[index] = item;
    this._size++;
  }

  get(index: i32): T {
    return this.array[index];
  }

  remove(index: i32): T {
    if (index > this._size - 1) throw new RangeError('Index out of range');

    const deleted = this.array[index];

    if (index == this._size - 1) {
      // this.array[index] = null;
      this._size--;
      this.decrease();
      return deleted;
    }

    for (let i = index; i < this._size - 1; i++) {
      unchecked((this.array[i] = this.array[i + 1]));
    }

    // this.array[this._size - 1] = null;
    this._size--;
    this.decrease();
    return deleted;
  }

  private increase(): void {
    if (this._size == this.array.length) {
      this.updateSize(this._size + this.vector);
    }
  }

  private decrease(): void {
    const prevLength = this.array.length - this.vector;
    if (this._size < prevLength) {
      this.updateSize(prevLength);
    }
  }

  private updateSize(newLength: i32): void {
    const newArray = new StaticArray<T>(newLength);
    for (let i = 0; i < this._size; i++) {
      unchecked((newArray[i] = this.array[i]));
    }

    this.array = newArray;
  }
}
