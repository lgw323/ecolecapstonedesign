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

const [n, m, k] = input[lineIndex++].split(' ').map(Number);

const adjList = Array.from({ length: n + 1 }, () => []);
const distPQs = Array.from({ length: n + 1 }, () => new PriorityQueue((a, b) => b - a));

for (let i = 0; i < m; i++) {
    const [a, b, c] = input[lineIndex++].split(' ').map(Number);
    adjList[a].push({ node: b, weight: c });
}

const pq = new PriorityQueue((a, b) => a.weight - b.weight);
pq.push({ node: 1, weight: 0 });
distPQs[1].push(0);

while (!pq.isEmpty()) {
    const current = pq.pop();

    for (const next of adjList[current.node]) {
        const newDist = current.weight + next.weight;

        if (distPQs[next.node].size() < k) {
            distPQs[next.node].push(newDist);
            pq.push({ node: next.node, weight: newDist });
        } else if (newDist < distPQs[next.node].peek()) {
            distPQs[next.node].pop();
            distPQs[next.node].push(newDist);
            pq.push({ node: next.node, weight: newDist });
        }
    }
}

let result = '';
for (let i = 1; i <= n; i++) {
    if (distPQs[i].size() < k) {
        result += "-1\n";
    } else {
        result += distPQs[i].peek() + "\n";
    }
}
console.log(result.trim());
