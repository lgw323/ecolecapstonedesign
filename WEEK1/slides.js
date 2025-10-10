// 발표 내용을 이 파일에서 수정하세요.
const presentationData = [
    // Slide 0: Title
    {
        type: 'title',
        title: '알고리즘 8문제',
        author: '경성대학교 소프트웨어학과',
        author_detail: '2021663046 이건우'
    },
    // Slide 1: Table of Contents
    {
        type: 'toc',
        title: '발표 순서',
        items: [
            '수 정렬하기 2', '숫자의 합', '구간 합 구하기 4',
            '연속된 자연수의 합', '좋다', '최솟값 찾기',
            '스택 수열', '카드2'
        ]
    },
    // Problem Slides
    {
        type: 'problem',
        title: '문제 1: 수 정렬하기 2 (BOJ 2751)',
        description: 'N개의 수가 주어졌을 때, 이 수들을 **오름차순으로 정렬**하는 문제입니다. 시간 복잡도가 중요합니다.',
        codes: {
            java: `import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;

public class ecole000 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        int arr[] = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = Integer.parseInt(br.readLine());
        }
        Arrays.sort(arr);
        for (int i : arr) {
            System.out.println(i);
        }
    }
}`,
            python: `# BOJ 2751
import sys

n = int(sys.stdin.readline())
l = []
for i in range(n):
    l.append(int(sys.stdin.readline()))
l.sort()
for i in l:
    print(i)`,
            javascript: `// BOJ 2751
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\\n');
input.shift(); // Remove N
input.sort((a, b) => a - b);
console.log(input.join('\\n'));`
        }
    },
    {
        type: 'problem',
        title: '문제 2: 숫자의 합 (BOJ 11720)',
        description: 'N개의 숫자가 **공백 없이 하나의 문자열로** 주어집니다. 이 숫자들을 모두 합산하여 출력하는 문제입니다.',
        codes: {
            java: `import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class ecole001 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        String lines[] = br.readLine().split("");
        int result = 0;
        for (String string : lines) {
            result += Integer.parseInt(string);
        }
        System.out.println(result);
    }
}`,
            python: `# BOJ 11720
n = input()
print(sum(map(int, input())))`,
            javascript: `// BOJ 11720
const input = require('fs')
    .readFileSync('/dev/stdin')
    .toString().trim().split('\\n');

const result = input[1]
    .split('')
    .reduce((acc, cur) => acc + Number(cur), 0);
    
console.log(result);`
        }
    },
    {
        type: 'problem',
        title: '문제 3: 구간 합 구하기 4 (BOJ 11659)',
        description: 'N개의 수가 주어지고, M개의 **구간(i부터 j까지)이 지정**됩니다. 각 구간의 합을 모두 구하는 문제입니다.',
        codes: {
            java: `import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class ecole002 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        int m = Integer.parseInt(st.nextToken());

        int[] arr = new int[n];
        st = new StringTokenizer(br.readLine());
        arr[0] = Integer.parseInt(st.nextToken());
        for (int i = 1; i < arr.length; i++) {
            arr[i] += arr[i - 1] + Integer.parseInt(st.nextToken());
        }

        int mini, maxs;
        for (int i = 0; i < m; i++) {
            st = new StringTokenizer(br.readLine());
            mini = Integer.parseInt(st.nextToken()) - 1;
            maxs = Integer.parseInt(st.nextToken()) - 1;
            if (mini == 0) {
                System.out.println(arr[maxs]);
            } else {
                System.out.println(arr[maxs] - arr[mini - 1]);
            }
        }
    }
}`,
            python: `# BOJ 11659
import sys
input = sys.stdin.readline
n, m = map(int, input().split())
numbers = list(map(int, input().split()))
prefix_sum = [0]
temp = 0
for i in numbers:
    temp += i
    prefix_sum.append(temp)

for i in range(m):
    a, b = map(int, input().split())
    print(prefix_sum[b] - prefix_sum[a-1])`,
            javascript: `// BOJ 11659
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\\n');
const [N, M] = input[0].split(' ').map(Number);
const numbers = input[1].split(' ').map(Number);
const prefixSum = [0];
numbers.forEach((num, i) => {
    prefixSum[i + 1] = prefixSum[i] + num;
});
let result = '';
for (let i = 2; i < M + 2; i++) {
    const [start, end] = input[i].split(' ').map(Number);
    result += prefixSum[end] - prefixSum[start - 1] + '\\n';
}
console.log(result.trim());`
        }
    },
    {
        type: 'problem',
        title: '문제 4: 연속된 자연수의 합 (BOJ 2018)',
        description: '자연수 N을 **연속된 자연수들의 합**으로 나타낼 수 있는 경우의 수가 총 몇 가지인지 찾는 문제입니다.',
        codes: {
            java: `import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class ecole003 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        int count = 1;
        int sum = 0;
        int sidx = 0;
        int eidx = 0;

        while (eidx != n) {
            if (sum == n) {
                count++;
                eidx++;
                sum += eidx;
            } else if (sum < n) {
                eidx++;
                sum += eidx;
            } else if (sum > n) {
                sum -= sidx;
                sidx++;
            }
        }
        System.out.println(count);
    }
}`,
            python: `# BOJ 2018
n = int(input())
count = 1
start, end = 1, 1
current_sum = 1
while end != n:
    if current_sum == n:
        count += 1; end += 1
        current_sum += end
    elif current_sum < n:
        end += 1; current_sum += end
    else:
        current_sum -= start; start += 1
print(count)`,
            javascript: `// BOJ 2018
const n = Number(require('fs').readFileSync('/dev/stdin').toString());
let count = 1, start = 1, end = 1, sum = 1;

while (end !== n) {
  if (sum < n) {
    end++; sum += end;
  } else if (sum > n) {
    sum -= start; start++;
  } else {
    count++; end++; sum += end;
  }
}
console.log(count);`
        }
    },
    {
        type: 'problem',
        title: '문제 5: 좋다 (BOJ 1253)',
        description: 'N개의 수 중에서, 어떤 수가 **서로 다른 두 수의 합**으로 표현될 수 있다면 그 수를 "좋은 수"라고 합니다. 좋은 수가 총 몇 개인지 찾는 문제입니다.',
        codes: {
            java: `import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class ecole004 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        long[] arr = new long[n];
        StringTokenizer st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) {
            arr[i] = Long.parseLong(st.nextToken());
        }
        Arrays.sort(arr);

        int start, end, count = 0;
        long target;
        for (int i = 0; i < arr.length; i++) {
            target = arr[i];
            start = 0;
            end = n - 1;
            while (start < end) {
                if (start == i) {
                    start++;
                    continue;
                } else if (end == i) {
                    end--;
                    continue;
                }
                long sum = arr[start] + arr[end];
                if (sum == target) {
                    count++;
                    break;
                } else if (sum < target) {
                    start++;
                } else if (sum > target) {
                    end--;
                }
            }
        }
        System.out.println(count);
    }
}`,
            python: `# BOJ 1253
import sys
input = sys.stdin.readline
N = int(input())
A = list(map(int, input().split()))
A.sort()
count = 0
for k in range(N):
    find = A[k]
    i, j = 0, N - 1
    while i < j:
        s = A[i] + A[j]
        if s == find:
            if i != k and j != k: count += 1; break
            elif i == k: i += 1
            else: j -= 1
        elif s < find: i += 1
        else: j -= 1
print(count)`,
            javascript: `// BOJ 1253
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\\n');
const N = Number(input[0]);
const A = input[1].split(' ').map(Number).sort((a, b) => a - b);
let count = 0;
for (let k = 0; k < N; k++) {
    const find = A[k];
    let i = 0, j = N - 1;
    while (i < j) {
        const sum = A[i] + A[j];
        if (sum === find) {
            if (i !== k && j !== k) { count++; break; }
            else if (i === k) i++;
            else j--;
        } else if (sum < find) i++;
        else j--;
    }
}
console.log(count);`
        }
    },
    {
        type: 'problem',
        title: '문제 6: 최솟값 찾기 (BOJ 11003)',
        description: 'N개의 수가 있을 때, 크기 L의 **슬라이딩 윈도우가 이동**하면서 각 윈도우에 포함된 수 중 **최솟값**을 모두 구하는 문제입니다.',
        codes: {
            java: `import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.StringTokenizer;

public class ecole005 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringTokenizer st = new StringTokenizer(br.readLine());

        int num = Integer.parseInt(st.nextToken());
        int window = Integer.parseInt(st.nextToken());

        st = new StringTokenizer(br.readLine());
        Deque<int[]> deque = new ArrayDeque<>();

        for (int i = 0; i < num; i++) {
            int now = Integer.parseInt(st.nextToken());
            while (!deque.isEmpty() && deque.peekLast()[0] >= now) {
                deque.pollLast();
            }

            deque.offerLast(new int[] { now, i });

            if (i - window >= deque.peekFirst()[1]) {
                deque.pollFirst();
            }
            bw.write(deque.peekFirst()[0] + " ");
        }
        bw.flush();
    }
}`,
            python: `# BOJ 11003
from collections import deque
N, L = map(int, input().split())
mydeque = deque()
now = list(map(int, input().split()))
for i in range(N):
    while mydeque and mydeque[-1][0] > now[i]:
        mydeque.pop()
    mydeque.append((now[i], i))
    if mydeque[0][1] <= i - L:
        mydeque.popleft()
    print(mydeque[0][0], end=' ')`,
            javascript: `// BOJ 11003
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\\n');
const [N, L] = input[0].split(' ').map(Number);
const nums = input[1].split(' ').map(Number);
const deque = [];
let result = [];
for(let i=0; i < N; i++){
    while(deque.length > 0 && deque[deque.length-1].value > nums[i]) deque.pop();
    deque.push({value: nums[i], index: i});
    if(deque[0].index <= i - L) deque.shift();
    result.push(deque[0].value);
}
console.log(result.join(' '));`
        }
    },
    {
        type: 'problem',
        title: '문제 7: 스택 수열 (BOJ 1874)',
        description: '1부터 n까지의 수를 스택에 **오름차순으로 push**하고 pop하여, 주어진 임의의 수열을 만들 수 있는지 **가능 여부를 판별**하는 문제입니다.',
        codes: {
            java: `import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Stack;

public class ecole006 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder sb = new StringBuilder();
        int n = Integer.parseInt(br.readLine());
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = Integer.parseInt(br.readLine());
        }

        Stack<Integer> stack = new Stack<>();
        int num = 1;
        boolean ispossible = true;
        for (int i = 0; i < arr.length; i++) {
            int now = arr[i];
            if (now >= num) {
                while (now >= num) {
                    stack.push(num++);
                    sb.append("+\\n");
                }
                stack.pop();
                sb.append("-\\n");
            } else {
                int upper = stack.peek();
                if (upper > now) {
                    System.out.println("NO");
                    ispossible = false;
                    break;
                } else {
                    stack.pop();
                    sb.append("-\\n");
                }
            }
        }
        if (ispossible) {
            System.out.println(sb);
        }
    }
}`,
            python: `# BOJ 1874
n = int(input())
stack, result, count = [], [], 1
possible = True
for _ in range(n):
    num = int(input())
    while count <= num:
        stack.append(count); result.append('+'); count += 1
    if stack.pop() == num:
        result.append('-')
    else:
        possible = False; break
if not possible: print('NO')
else: print('\\n'.join(result))`,
            javascript: `// BOJ 1874
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\\n').map(Number);
const n = input.shift();
const stack = [];
let result = '', count = 1;
for (let i = 0; i < n; i++) {
    const num = input[i];
    while (count <= num) {
        stack.push(count++); result += '+\\n';
    }
    const popped = stack.pop();
    if (popped !== num) { result = 'NO'; break; }
    result += '-\\n';
}
console.log(result.trim());`
        }
    },
    {
        type: 'problem',
        title: '문제 8: 카드2 (BOJ 2164)',
        description: '1부터 N까지의 카드를 쌓고, **"맨 위 카드 버리기, 그다음 카드는 맨 아래로 옮기기"**를 반복했을 때 마지막에 남는 카드를 찾는 문제입니다.',
        codes: {
            java: `import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.Queue;

public class ecole007 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 1; i <= n; i++) {
            queue.offer(i);
        }
        while (queue.size() != 1) {
            queue.poll();
            int num = queue.poll();
            queue.offer(num);
        }
        System.out.println(queue.poll());
    }
}`,
            python: `# BOJ 2164
from collections import deque
n = int(input())
queue = deque(range(1, n + 1))
while len(queue) > 1:
    queue.popleft()
    queue.append(queue.popleft())
print(queue[0])`,
            javascript: `// BOJ 2164
const n = Number(require('fs').readFileSync('/dev/stdin').toString());
class Node {
    constructor(value) { this.value = value; this.next = null; }
}
class Queue { // Efficient Queue
    constructor() { this.head=null; this.tail=null; this.size=0; }
    enqueue(v) {
        const newNode = new Node(v);
        if (!this.head) { this.head=newNode; this.tail=newNode; }
        else { this.tail.next = newNode; this.tail = newNode; }
        this.size++;
    }
    dequeue() {
        if (!this.head) return null;
        const value = this.head.value;
        this.head = this.head.next;
        this.size--;
        if (!this.head) this.tail = null;
        return value;
    }
}
const queue = new Queue();
for (let i = 1; i <= n; i++) queue.enqueue(i);
while (queue.size > 1) {
    queue.dequeue();
    queue.enqueue(queue.dequeue());
}
console.log(queue.dequeue());`
        }
    }
];

