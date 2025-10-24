import sys
from collections import deque

input = sys.stdin.readline
n, m, k, x = map(int, input().split())
adjList = [[] for _ in range(n + 1)]

for _ in range(m):
    u, v = map(int, input().split())
    adjList[u].append(v)

distance = [-1] * (n + 1)
queue = deque([x])
distance[x] = 0

while queue:
    current = queue.popleft()
    for neighbor in adjList[current]:
        if distance[neighbor] == -1:
            distance[neighbor] = distance[current] + 1
            queue.append(neighbor)

result = []
for i in range(1, n + 1):
    if distance[i] == k:
        result.append(i)

if not result:
    print(-1)
else:
    for city in result:
        print(city)
