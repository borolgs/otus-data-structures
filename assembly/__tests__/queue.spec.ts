import { PrioirityQueue } from '../queue/queue';

let queue: PrioirityQueue<string>;

describe('Prioirity Queue', () => {
  beforeEach(() => {
    queue = new PrioirityQueue<string>();
  });

  it('should enqueue', () => {
    queue.enqueue(0, 'a');
    queue.enqueue(0, 'b');
    queue.enqueue(0, 'c');
    expect<i32>(queue.size).toBe(3);
  });

  it('should dequeue', () => {
    queue.enqueue(0, 'e');
    queue.enqueue(0, 'f');
    queue.enqueue(10, 'a');
    queue.enqueue(0, 'g');
    queue.enqueue(5, 'c');
    queue.enqueue(5, 'd');
    queue.enqueue(10, 'b');

    expect<string>(queue.dequeue()).toBe('a');
    expect<string>(queue.dequeue()).toBe('b');
    expect<string>(queue.dequeue()).toBe('c');
    expect<string>(queue.dequeue()).toBe('d');
    expect<string>(queue.dequeue()).toBe('e');
    expect<string>(queue.dequeue()).toBe('f');
    expect<string>(queue.dequeue()).toBe('g');
    expect<i32>(queue.size).toBe(0);
  });
});
