import sys

n = int(sys.stdin.readline())
arr = list(map(int, sys.stdin.readline().split()))
arr.sort()
count = 0

for i in range(n):
    target = arr[i]
    start = 0
    end = n - 1

    while start < end:
        current_sum = arr[start] + arr[end]

        if current_sum == target:
            # 시작 포인터와 끝 포인터가 현재 타겟의 인덱스와 달라야 함
            if start != i and end != i:
                count += 1
                break
            elif start == i:
                start += 1
            elif end == i:
                end -= 1
        elif current_sum < target:
            start += 1
        else:  # current_sum > target
            end -= 1

print(count)
