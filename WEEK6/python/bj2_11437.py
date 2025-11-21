import sys

sys.setrecursionlimit(10**6)
input = sys.stdin.readline


def dfs(node, d):
    visited[node] = True
    depth[node] = d
    for next_node in adj[node]:
        if not visited[next_node]:
            parent[next_node] = node
            dfs(next_node, d + 1)


def lca(a, b):
    if depth[a] < depth[b]:
        a, b = b, a

    while depth[a] != depth[b]:
        a = parent[a]

    while a != b:
        a = parent[a]
        b = parent[b]

    return a


n = int(input())
adj = [[] for _ in range(n + 1)]
parent = [0] * (n + 1)
depth = [0] * (n + 1)
visited = [False] * (n + 1)

for _ in range(n - 1):
    a, b = map(int, input().split())
    adj[a].append(b)
    adj[b].append(a)

dfs(1, 0)

m = int(input())
for _ in range(m):
    a, b = map(int, input().split())
    print(lca(a, b))
