import sys

input = sys.stdin.readline
INF = float('inf')

class Edge:
    def __init__(self, start, end, time):
        self.start = start
        self.end = end
        self.time = time

N, M = map(int, input().split())
edges = []
dist = [INF] * (N + 1)

for _ in range(M):
    A, B, C = map(int, input().split())
    edges.append(Edge(A, B, C))

dist[1] = 0

for i in range(1, N):
    for j in range(M):
        edge = edges[j]
        if dist[edge.start] != INF and dist[edge.end] > dist[edge.start] + edge.time:
            dist[edge.end] = dist[edge.start] + edge.time

hasNegativeCycle = False
for j in range(M):
    edge = edges[j]
    if dist[edge.start] != INF and dist[edge.end] > dist[edge.start] + edge.time:
        hasNegativeCycle = True
        break

if hasNegativeCycle:
    print("-1")
else:
    for i in range(2, N + 1):
        if dist[i] == INF:
            print("-1")
        else:
            print(dist[i])