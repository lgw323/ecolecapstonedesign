import sys

sys.setrecursionlimit(10**6)
input = sys.stdin.readline

N = int(input())
parent_info = list(map(int, input().split()))
deleted = int(input())
arr = [[] for _ in range(N)]
root = -1
leafcount = 0

for now in range(N):
    parent = parent_info[now]
    if parent == -1:
        root = now
    else:
        arr[parent].append(now)


def DFS(number):
    global leafcount
    isLeaf = True

    for child in arr[number]:
        if child == deleted:
            continue
        isLeaf = False
        DFS(child)

    if isLeaf:
        leafcount += 1


if deleted == root:
    print(0)
else:
    DFS(root)
    print(leafcount)
