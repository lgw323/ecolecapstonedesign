import sys

sys.setrecursionlimit(10**6)
input = sys.stdin.readline


def init(node, start, end):
    if start == end:
        tree[node] = arr[start]
        return tree[node]
    mid = (start + end) // 2
    tree[node] = init(node * 2, start, mid) + init(node * 2 + 1, mid + 1, end)
    return tree[node]


def update(node, start, end, index, diff):
    if index < start or index > end:
        return
    tree[node] += diff
    if start != end:
        mid = (start + end) // 2
        update(node * 2, start, mid, index, diff)
        update(node * 2 + 1, mid + 1, end, index, diff)


def sum_tree(node, start, end, left, right):
    if left > end or right < start:
        return 0
    if left <= start and end <= right:
        return tree[node]
    mid = (start + end) // 2
    return sum_tree(node * 2, start, mid, left, right) + sum_tree(
        node * 2 + 1, mid + 1, end, left, right
    )


n, m, k = map(int, input().split())
arr = [0] * (n + 1)
tree = [0] * (n * 4)

for i in range(1, n + 1):
    arr[i] = int(input())

init(1, 1, n)

for _ in range(m + k):
    a, b, c = map(int, input().split())
    if a == 1:
        diff = c - arr[b]
        arr[b] = c
        update(1, 1, n, b, diff)
    else:
        print(sum_tree(1, 1, n, b, c))
