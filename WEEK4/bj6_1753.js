class PriorityQueue {
    constructor(comparator = (a, b) => a - b) {
        this.heap = [];
        this.comparator = comparator;
    }
    size() {
        return this.heap.length;
    }
    isEmpty() {
        return this.heap.length === 0;
    }
    peek() {
        return this.heap[0];
    }
    push(value) {
        this.heap.push(value);
        this.bubbleUp();
    }
    pop() {
        if (this.isEmpty()) return undefined;
        if (this.heap.length === 1) return this.heap.pop();
        const value = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return value;
    }
    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.comparator(this.heap[index], this.heap[parentIndex]) < 0) {
                [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
                index = parentIndex;
            } else {
                break;
            }
        }
    }
    bubbleDown() {
        let index = 0;
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let smallestChildIndex = index;

            if (leftChildIndex < this.heap.length && this.comparator(this.heap[leftChildIndex], this.heap[smallestChildIndex]) < 0) {
                smallestChildIndex = leftChildIndex;
            }
            if (rightChildIndex < this.heap.length && this.comparator(this.heap[rightChildIndex], this.heap[smallestChildIndex]) < 0) {
                smallestChildIndex = rightChildIndex;
            }
            if (smallestChildIndex === index) break;

            [this.heap[index], this.heap[smallestChildIndex]] = [this.heap[smallestChildIndex], this.heap[index]];
            index = smallestChildIndex;
        }
    }
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let lineIndex = 0;

const [v, e] = input[lineIndex++].split(' ').map(Number);
const k = Number(input[lineIndex++]);

const adjList = Array.from({ length: v + 1 }, () => []);
const dist = new Array(v + 1).fill(Infinity);

for (let i = 0; i < e; i++) {
    const [u, w, weight] = input[lineIndex++].split(' ').map(Number);
    adjList[u].push({ node: w, weight: weight });
}

const pq = new PriorityQueue((a, b) => a.weight - b.weight);
dist[k] = 0;
pq.push({ node: k, weight: 0 });

while (!pq.isEmpty()) {
    const current = pq.pop();

    if (current.weight > dist[current.node]) {
        continue;
    }

    for (const next of adjList[current.node]) {
        if (dist[next.node] > dist[current.node] + next.weight) {
            dist[next.node] = dist[current.node] + next.weight;
            pq.push({ node: next.node, weight: dist[next.node] });
        }
    }
}

let result = '';
for (let i = 1; i <= v; i++) {
    if (dist[i] === Infinity) {
        result += "INF\n";
    } else {
        result += dist[i] + "\n";
    }
}
console.log(result.trim());
