import sys

sys.setrecursionlimit(10**6)


def dfs(node):
    visited[node] = True
    for neighbor in adj_list[node]:
        if not visited[neighbor]:
            dfs(neighbor)


n, m = map(int, sys.stdin.readline().split())

adj_list = [[] for _ in range(n + 1)]
visited = [False] * (n + 1)

for _ in range(m):
    u, v = map(int, sys.stdin.readline().split())
    adj_list[u].append(v)
    adj_list[v].append(u)

component_count = 0
for i in range(1, n + 1):
    if not visited[i]:
        component_count += 1
        dfs(i)

print(component_count)
