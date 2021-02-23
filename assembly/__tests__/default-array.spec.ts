import { DefaultArray } from '../array/default-array';

let array: DefaultArray<string>;

describe('Default Array', () => {
  beforeEach(() => {
    array = new DefaultArray<string>();
  });

  it('should add elements', () => {
    array.add('a');
    array.add('b');
    array.add('c');
    expect<i32>(array.size()).toBe(3);
  });

  it('should insert in the beginning', () => {
    array.add('a');
    array.add('b');
    array.add('c');
    array.insert('new', 0);
    expect<i32>(array.size()).toBe(4);
    expect<string>(array.get(0)).toBe('new');
    expect<string>(array.get(1)).toBe('a');
    expect<string>(array.get(3)).toBe('c');
  });

  it('should insert in the middle', () => {
    array.add('a');
    array.add('b');
    array.add('c');
    array.insert('new', 1);
    expect<i32>(array.size()).toBe(4);
    expect<string>(array.get(0)).toBe('a');
    expect<string>(array.get(1)).toBe('new');
    expect<string>(array.get(3)).toBe('c');
  });

  it('should insert in the end', () => {
    array.add('a');
    array.add('b');
    array.add('c');
    array.insert('new', 2);
    expect<i32>(array.size()).toBe(4);
    expect<string>(array.get(0)).toBe('a');
    expect<string>(array.get(2)).toBe('new');
    expect<string>(array.get(3)).toBe('c');
  });

  it('should remove first element', () => {
    array.add('a');
    array.add('b');
    array.add('c');
    array.remove(0);
    expect<i32>(array.size()).toBe(2);
    expect<string>(array.get(0)).toBe('b');
    expect<string>(array.get(1)).toBe('c');
  });

  it('should remove element in the middle', () => {
    array.add('a');
    array.add('b');
    array.add('c');
    array.remove(1);
    expect<i32>(array.size()).toBe(2);
    expect<string>(array.get(0)).toBe('a');
    expect<string>(array.get(1)).toBe('c');
  });

  it('should remove last element', () => {
    array.add('a');
    array.add('b');
    array.add('c');
    array.remove(2);
    expect<i32>(array.size()).toBe(2);
    expect<string>(array.get(0)).toBe('a');
    expect<string>(array.get(1)).toBe('b');
  });
});
