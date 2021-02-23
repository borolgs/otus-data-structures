import { PrioirityQueue } from './queue';

let queue: PrioirityQueue<string>;
let count: i32 = 0;

export function test(): void {
  queue = new PrioirityQueue<string>();
  showEnqueue(0, 'e');
  showEnqueue(0, 'f');
  showEnqueue(10, 'a');
  showEnqueue(0, 'g');
  showEnqueue(5, 'c');
  showEnqueue(5, 'd');
  showEnqueue(10, 'b');

  showDequeue();
  showDequeue();
  showDequeue();
  showDequeue();
  showDequeue();
  showDequeue();
  showDequeue();
}

function showEnqueue(priority: i32, value: string): void {
  count++;
  print(count.toString() + '. Enqueue ' + priority.toString() + ': ' + value + '\n');
  queue.enqueue(priority, value);
  print(queue.info());
}

function showDequeue(): void {
  count++;
  print(count.toString() + '. Dequeue ' + queue.dequeue().toString());
  print(queue.info());
}
