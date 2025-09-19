import sys
from collections import deque


def dfs(node):
    visited[node] = True
    dfs_result.append(node)
    for neighbor in adj_list[node]:
        if not visited[neighbor]:
            dfs(neighbor)


def bfs(start_node):
    queue = deque([start_node])
    visited[start_node] = True

    while queue:
        node = queue.popleft()
        bfs_result.append(node)
        for neighbor in adj_list[node]:
            if not visited[neighbor]:
                visited[neighbor] = True
                queue.append(neighbor)


n, m, v = map(int, sys.stdin.readline().split())

adj_list = [[] for _ in range(n + 1)]
for _ in range(m):
    u, w = map(int, sys.stdin.readline().split())
    adj_list[u].append(w)
    adj_list[w].append(u)

for i in range(1, n + 1):
    adj_list[i].sort()

visited = [False] * (n + 1)
dfs_result = []
dfs(v)
print(*dfs_result)

visited = [False] * (n + 1)
bfs_result = []
bfs(v)
print(*bfs_result)
