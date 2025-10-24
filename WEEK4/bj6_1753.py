import sys
import heapq

input = sys.stdin.readline
v, e = map(int, input().split())
k = int(input())

adjList = [[] for _ in range(v + 1)]
dist = [float("inf")] * (v + 1)

for _ in range(e):
    u, w, weight = map(int, input().split())
    adjList[u].append((w, weight))

pq = []
dist[k] = 0
heapq.heappush(pq, (0, k))

while pq:
    current_weight, current_node = heapq.heappop(pq)

    if current_weight > dist[current_node]:
        continue

    for next_node, weight in adjList[current_node]:
        new_dist = dist[current_node] + weight
        if new_dist < dist[next_node]:
            dist[next_node] = new_dist
            heapq.heappush(pq, (new_dist, next_node))

for i in range(1, v + 1):
    if dist[i] == float("inf"):
        print("INF")
    else:
        print(dist[i])
