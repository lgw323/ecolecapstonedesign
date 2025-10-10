n = int(input())
count = 1
start, end = 1, 1
current_sum = 1

while end != n:
    if current_sum == n:
        count += 1
        end += 1
        current_sum += end
    elif current_sum < n:
        end += 1
        current_sum += end
    else:  # current_sum > n
        current_sum -= start
        start += 1

print(count)
