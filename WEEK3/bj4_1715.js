const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);

const n = input[0];
const cards = input.slice(1);

// MinHeap implementation for Priority Queue
class MinHeap {
    constructor() {
        this.heap = [];
    }
    size() {
        return this.heap.length;
    }
    push(value) {
        this.heap.push(value);
        this.bubbleUp();
    }
    pop() {
        if (this.size() === 1) return this.heap.pop();
        const value = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return value;
    }
    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex] <= this.heap[index]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }
    bubbleDown() {
        let index = 0;
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let smallestChildIndex = index;
            if (leftChildIndex < this.size() && this.heap[leftChildIndex] < this.heap[smallestChildIndex]) {
                smallestChildIndex = leftChildIndex;
            }
            if (rightChildIndex < this.size() && this.heap[rightChildIndex] < this.heap[smallestChildIndex]) {
                smallestChildIndex = rightChildIndex;
            }
            if (smallestChildIndex === index) break;
            [this.heap[smallestChildIndex], this.heap[index]] = [this.heap[index], this.heap[smallestChildIndex]];
            index = smallestChildIndex;
        }
    }
}

const pq = new MinHeap();
for (const card of cards) {
    pq.push(card);
}

let totalSum = 0;
while (pq.size() > 1) {
    const temp1 = pq.pop();
    const temp2 = pq.pop();
    const currentSum = temp1 + temp2;
    totalSum += currentSum;
    pq.push(currentSum);
}

console.log(totalSum);
