import { IArray } from './array-interface';

export class FactorArray<T> implements IArray<T> {
  private array: StaticArray<T>;
  private factor: i32;
  private _size: i32;
  private _prevSize: i32;

  constructor(length: i32 = 5, factor: i32 = 50) {
    this.factor = factor;
    this.array = new StaticArray<T>(length);
    this._size = 0;
    this._prevSize = this._size;
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
    if (index > this._size - 1) throw new RangeError('Index out of range');
    return this.array[index];
  }

  remove(index: i32): T {
    if (index > this._size - 1) throw new RangeError('Index out of range');

    const deleted = this.array[index] as T;

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
      this._prevSize = this._size;
      const newLength = this._size + (this.array.length * this.factor) / 100;
      this.updateSize(newLength);
    }
  }

  private decrease(): void {
    if (this._size < this._prevSize) {
      this.updateSize(this._prevSize);
    }
  }

  private updateSize(newLength: i32): void {
    const newArray = new StaticArray<T>(newLength);
    for (let i = 0; i < this._size; i++) {
      unchecked((newArray[i] = this.array[i]));
    }

    this.array = newArray;
  }

  public indexOf(item: T): i32 {
    for (let i = 0; i < this._size; i++) {
      if (item == unchecked(this.array[i])) {
        return i;
      }
    }
    return -1;
  }
}
