import sys

expression = sys.stdin.readline().strip().split("-")
result = 0

first_part = list(map(int, expression[0].split("+")))
result += sum(first_part)

for i in range(1, len(expression)):
    other_part = list(map(int, expression[i].split("+")))
    result -= sum(other_part)

print(result)
