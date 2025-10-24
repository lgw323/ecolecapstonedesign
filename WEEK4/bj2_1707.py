import sys
from collections import deque

input = sys.stdin.readline
sys.setrecursionlimit(200000)


def bfs(start_node, v, adjList, groups):
    queue = deque([start_node])
    groups[start_node] = 1

    while queue:
        current = queue.popleft()
        next_group = 2 if groups[current] == 1 else 1

        for neighbor in adjList[current]:
            if groups[neighbor] == 0:
                groups[neighbor] = next_group
                queue.append(neighbor)
            elif groups[neighbor] == groups[current]:
                return False
    return True


k = int(input())
for _ in range(k):
    v, e = map(int, input().split())
    adjList = [[] for _ in range(v + 1)]
    groups = [0] * (v + 1)

    for _ in range(e):
        u, w = map(int, input().split())
        adjList[u].append(w)
        adjList[w].append(u)

    is_bipartite = True
    for i in range(1, v + 1):
        if groups[i] == 0:
            if not bfs(i, v, adjList, groups):
                is_bipartite = False
                break

    print("YES" if is_bipartite else "NO")
