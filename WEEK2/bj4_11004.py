import sys

sys.setrecursionlimit(10**6)


def partition(arr, left, right):
    pivot = arr[right]
    i = left - 1
    for j in range(left, right):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[right] = arr[right], arr[i + 1]
    return i + 1


def quick_sort(arr, left, right, want):
    if left >= right:
        return

    pivot_index = partition(arr, left, right)

    if want == pivot_index:
        return
    elif pivot_index > want:
        quick_sort(arr, left, pivot_index - 1, want)
    else:
        quick_sort(arr, pivot_index + 1, right, want)


n, want = map(int, sys.stdin.readline().split())
arr = list(map(int, sys.stdin.readline().split()))

quick_sort(arr, 0, n - 1, want - 1)
print(arr[want - 1])
