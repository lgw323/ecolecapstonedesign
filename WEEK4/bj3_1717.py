import sys

sys.setrecursionlimit(10**6)
input = sys.stdin.readline


def find(i):
    if parent[i] == i:
        return i
    parent[i] = find(parent[i])
    return parent[i]


def union(a, b):
    rootA = find(a)
    rootB = find(b)
    if rootA != rootB:
        parent[rootB] = rootA


n, m = map(int, input().split())
parent = list(range(n + 1))

for _ in range(m):
    op, a, b = map(int, input().split())
    if op == 0:
        union(a, b)
    else:
        if find(a) == find(b):
            print("YES")
        else:
            print("NO")
