import sys

n, m = map(int, sys.stdin.readline().split())
lectures = list(map(int, sys.stdin.readline().split()))

left, right = max(lectures), sum(lectures)
result = right

while left <= right:
    mid = (left + right) // 2
    count = 1
    current_sum = 0

    for lecture in lectures:
        if current_sum + lecture > mid:
            count += 1
            current_sum = lecture
        else:
            current_sum += lecture

    if count <= m:
        result = mid
        right = mid - 1
    else:
        left = mid + 1

print(result)
