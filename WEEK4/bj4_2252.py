import sys
from collections import deque

input = sys.stdin.readline
n, m = map(int, input().split())

adjList = [[] for _ in range(n + 1)]
inDegree = [0] * (n + 1)

for _ in range(m):
    a, b = map(int, input().split())
    adjList[a].append(b)
    inDegree[b] += 1

queue = deque()
for i in range(1, n + 1):
    if inDegree[i] == 0:
        queue.append(i)

result = []
while queue:
    current = queue.popleft()
    result.append(current)

    for neighbor in adjList[current]:
        inDegree[neighbor] -= 1
        if inDegree[neighbor] == 0:
            queue.append(neighbor)

print(*result)
