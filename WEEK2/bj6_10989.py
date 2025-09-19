import sys


def radix_sort(arr):
    max_val = max(arr)
    max_digit = len(str(max_val))

    radix = 1

    for _ in range(max_digit):
        buckets = [[] for _ in range(10)]
        for num in arr:
            digit = (num // radix) % 10
            buckets[digit].append(num)

        arr = []
        for bucket in buckets:
            arr.extend(bucket)

        radix *= 10
    return arr


n = int(sys.stdin.readline())
arr = []
for _ in range(n):
    arr.append(int(sys.stdin.readline()))

sorted_arr = radix_sort(arr)

for val in sorted_arr:
    print(val)
