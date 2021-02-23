import { IArray } from './array-interface';
import { SingleArray } from './single-array';
import { VectorArray } from './vector-array';
import { DefaultArray } from './default-array';
import { FactorArray } from './factor-array';

export function test(size: i32 = 100): string[][] {
  const singleArray = new SingleArray<string>();
  const vectorArray = new VectorArray<string>();
  const factorArray = new FactorArray<string>();
  const defaultArray = new DefaultArray<string>();
  const results = [
    [
      'Type',
      'Add ' + size.toString() + ' items',
      'Get',
      'Insert 0',
      'Insert x',
      'Insert -1',
      'Remove 0',
      'Remove x',
      'Remove -1',
    ],
    testArray(singleArray, 'Single', size),
    testArray(vectorArray, 'Vector', size),
    testArray(factorArray, 'Factor', size),
    testArray(defaultArray, 'Default', size),
  ];
  return results;
}

function testArray(array: IArray<string>, description: string, size: i32): string[] {
  const results = [
    description,
    testAdd(array, size),
    testGet(array, 1),
    testInsert(array, 0, 'new'),
    testInsert(array, 2, 'new'),
    testInsert(array, size - 1, 'new'),
    testDelete(array, 0),
    testDelete(array, size / 2),
    testDelete(array, size - 1),
  ];
  return results;
}

function testAdd(array: IArray<string>, total: i32): string {
  const start = Date.now();
  for (let i = 0; i < total; i++) {
    array.add(i.toString());
  }
  const end = Date.now() - start;
  return end.toString() + 'ms';
}

function testGet(array: IArray<string>, index: i32): string {
  const start = Date.now();
  const item = array.get(index);
  const end = Date.now() - start;
  return end.toString() + 'ms';
}

function testDelete(array: IArray<string>, index: i32): string {
  const start = Date.now();
  const item = array.remove(index);
  const end = Date.now() - start;
  return end.toString() + 'ms';
}

function testInsert(array: IArray<string>, index: i32, item: string): string {
  const start = Date.now();

  array.insert(item, index);
  const end = Date.now() - start;
  return end.toString() + 'ms';
}
