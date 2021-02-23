import { FactorArray } from '../array/factor-array';

export class PrioirityQueue<T> {
  private store: FactorArray<FactorArray<T>> = new FactorArray<FactorArray<T>>();

  private priorities: FactorArray<i32> = new FactorArray<i32>();
  private maxPriority: i32 = i32.MIN_VALUE;
  private minPriority: i32 = i32.MAX_VALUE;

  private count: i32 = 0;

  get size(): i32 {
    return this.count;
  }

  enqueue(priority: i32, val: T): void {
    this.count++;
    const priorityIndex = this.priorities.indexOf(priority);
    let subQueue: FactorArray<T>;
    if (priorityIndex < 0) {
      subQueue = this.createSubQueue(priority);
    } else {
      subQueue = this.store.get(priorityIndex);
    }

    subQueue.add(val);
  }

  private createSubQueue(priority: i32): FactorArray<T> {
    const subQueue: FactorArray<T> = new FactorArray<T>();

    if (this.priorities.size() == 0) {
      // First queue
      this.priorities.add(priority);
      this.store.add(subQueue);
      this.maxPriority = priority;
      this.minPriority = priority;
    } else if (priority > this.maxPriority) {
      // Insert at start
      this.maxPriority = priority;
      this.priorities.insert(priority, 0);
      this.store.insert(subQueue, 0);
    } else if (priority < this.minPriority) {
      // Add to end
      this.minPriority = priority;
      this.priorities.add(priority);
      this.store.add(subQueue);
    } else {
      // Find place
      for (let i = 0; i < this.priorities.size(); i++) {
        const existPriority = this.priorities.get(i);
        if (priority > existPriority) {
          this.priorities.insert(priority, i);
          this.store.insert(subQueue, i);
          break;
        }
      }
    }

    return subQueue;
  }

  dequeue(): T {
    if (this.size == 0) {
      throw new Error('The Queue is empty');
    }

    this.count--;

    return this.getNext();
  }

  private getNext(): T {
    while (this.priorities.size() > 0) {
      this.maxPriority = this.priorities.get(0);
      const subQueue = this.store.get(0);
      if (subQueue.size() == 0) {
        this.priorities.remove(0);
        this.store.remove(0);
      } else {
        const item = subQueue.remove(0);

        const isLast: boolean = this.priorities.size() == 1 && subQueue.size() == 0;
        if (isLast) {
          this.maxPriority = i32.MIN_VALUE;
          this.minPriority = i32.MAX_VALUE;
        }

        return item;
      }
    }

    throw new Error('The Queue is empty');
  }

  info(): string {
    let info = '';
    for (let i = 0; i < this.priorities.size(); i++) {
      const priority: i32 = this.priorities.get(i);
      info += '[' + priority.toString().padStart(2, '0') + ']: ';
      const queue = this.store.get(i);

      const items: string[] = [];

      for (let j = 0; j < queue.size(); j++) {
        items.push(queue.get(j).toString());
      }

      info += items.join(', ');

      info += '\n';
    }
    return info;
  }
}
