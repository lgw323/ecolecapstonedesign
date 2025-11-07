import sys

sys.setrecursionlimit(10**6 + 1)
input = sys.stdin.readline

N = int(input())
visited = [False] * (N + 1)
answer = [0] * (N + 1)
tree = [[] for _ in range(N + 1)]

for _ in range(N - 1):
    n1, n2 = map(int, input().split())
    tree[n1].append(n2)
    tree[n2].append(n1)


def DFS(number):
    visited[number] = True
    for child in tree[number]:
        if not visited[child]:
            answer[child] = number
            DFS(child)


DFS(1)

for i in range(2, N + 1):
    print(answer[i])
