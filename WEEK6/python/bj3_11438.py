import sys

sys.setrecursionlimit(10**6)
input = sys.stdin.readline

n = int(input())
k_max = 0
temp = 1
while temp <= n:
    temp *= 2
    k_max += 1

adj = [[] for _ in range(n + 1)]
parent = [[0] * (n + 1) for _ in range(k_max + 1)]
depth = [0] * (n + 1)
visited = [False] * (n + 1)

for _ in range(n - 1):
    a, b = map(int, input().split())
    adj[a].append(b)
    adj[b].append(a)


def dfs(node, d):
    visited[node] = True
    depth[node] = d
    for next_node in adj[node]:
        if not visited[next_node]:
            parent[0][next_node] = node
            dfs(next_node, d + 1)


dfs(1, 0)

for i in range(1, k_max + 1):
    for j in range(1, n + 1):
        parent[i][j] = parent[i - 1][parent[i - 1][j]]


def lca(a, b):
    if depth[a] < depth[b]:
        a, b = b, a

    for i in range(k_max, -1, -1):
        if (1 << i) <= depth[a] - depth[b]:
            a = parent[i][a]

    if a == b:
        return a

    for i in range(k_max, -1, -1):
        if parent[i][a] != parent[i][b]:
            a = parent[i][a]
            b = parent[i][b]

    return parent[0][a]


m = int(input())
for _ in range(m):
    a, b = map(int, input().split())
    print(lca(a, b))
