import sys
import heapq

input = sys.stdin.readline
n, m, k = map(int, input().split())

adjList = [[] for _ in range(n + 1)]
distPQs = [[] for _ in range(n + 1)]

for _ in range(m):
    a, b, c = map(int, input().split())
    adjList[a].append((b, c))

pq = []
heapq.heappush(pq, (0, 1))
heapq.heappush(distPQs[1], 0)

while pq:
    current_weight, current_node = heapq.heappop(pq)

    for next_node, weight in adjList[current_node]:
        new_dist = current_weight + weight

        if len(distPQs[next_node]) < k:
            heapq.heappush(distPQs[next_node], -new_dist)
            heapq.heappush(pq, (new_dist, next_node))
        elif new_dist < -distPQs[next_node][0]:
            heapq.heappop(distPQs[next_node])
            heapq.heappush(distPQs[next_node], -new_dist)
            heapq.heappush(pq, (new_dist, next_node))

for i in range(1, n + 1):
    if len(distPQs[i]) < k:
        print("-1")
    else:
        print(-distPQs[i][0])
