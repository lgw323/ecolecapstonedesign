n = int(input())
arr = [int(input()) for _ in range(n)]

stack = []
result = []
num = 1
possible = True

for target in arr:
    while num <= target:
        stack.append(num)
        result.append("+")
        num += 1

    if stack[-1] == target:
        stack.pop()
        result.append("-")
    else:
        possible = False
        break

if possible:
    for op in result:
        print(op)
else:
    print("NO")
