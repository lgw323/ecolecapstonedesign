import sys
import heapq

input = sys.stdin.readline


def find(x):
    if parent[x] == x:
        return x
    parent[x] = find(parent[x])
    return parent[x]


def union(x, y):
    rootX = find(x)
    rootY = find(y)
    if rootX != rootY:
        parent[rootY] = rootX


V, E = map(int, input().split())
pq = []

for _ in range(E):
    A, B, C = map(int, input().split())
    heapq.heappush(pq, (C, A, B))

parent = [i for i in range(V + 1)]
totalWeight = 0
edgeCount = 0

while pq:
    weight, start, end = heapq.heappop(pq)

    if find(start) != find(end):
        union(start, end)
        totalWeight += weight
        edgeCount += 1

    if edgeCount == V - 1:
        break

print(totalWeight)
