const presentationData_part2 = [
    {
        type: 'problem_detail',
        title: '4. 이항 계수 1 (BOJ 11050)',
        problem: '자연수 N과 정수 K가 주어졌을 때 이항 계수 (N K)를 구하는 프로그램을 작성하시오.',
        input: '첫째 줄에 N과 K가 주어진다. (1 ≤ N ≤ 10, 0 ≤ K ≤ N)',
        output: '이항 계수 (N K)를 출력한다.',
        example_input_1: `5 2`,
        example_output_1: `10`
    },
    {
        type: 'problem',
        title: '알고리즘: 수학 (팩토리얼)',
        codes: {
            java: `import java.io.*;
import java.util.*;

public class bj4_11050 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        int k = Integer.parseInt(st.nextToken());

        System.out.println(factorial(n) / (factorial(k) * factorial(n - k)));
    }

    static int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
}`,
            python: `import sys

def factorial(n):
    if n <= 1: return 1
    return n * factorial(n - 1)

n, k = map(int, sys.stdin.readline().split())
print(factorial(n) // (factorial(k) * factorial(n - k)))`,
            javascript: `const fs = require('fs');
const [N, K] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(Number);

function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

console.log(factorial(N) / (factorial(K) * factorial(N - K)));`
        }
    },
    {
        type: 'problem_detail',
        title: '5. 이항 계수 2 (BOJ 11051)',
        problem: '자연수 N과 정수 K가 주어졌을 때 이항 계수 (N K)를 10,007로 나눈 나머지를 구하는 프로그램을 작성하시오.',
        input: 'N(1 ≤ N ≤ 1,000), K(0 ≤ K ≤ N)',
        output: '이항 계수를 10,007로 나눈 나머지 출력',
        example_input_1: `5 2`,
        example_output_1: `10`
    },
    {
        type: 'problem',
        title: '알고리즘: DP (파스칼의 삼각형)',
        codes: {
            java: `import java.io.*;
import java.util.*;

public class bj5_11051 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        int k = Integer.parseInt(st.nextToken());

        int[][] dp = new int[n + 1][n + 1];

        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= i; j++) {
                if (j == 0 || j == i) {
                    dp[i][j] = 1;
                } else {
                    dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j]) % 10007;
                }
            }
        }
        System.out.println(dp[n][k]);
    }
}`,
            python: `import sys
input = sys.stdin.readline

n, k = map(int, input().split())
dp = [[0] * (n + 1) for _ in range(n + 1)]

for i in range(n + 1):
    for j in range(i + 1):
        if j == 0 or j == i:
            dp[i][j] = 1
        else:
            dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j]) % 10007

print(dp[n][k])`,
            javascript: `const fs = require('fs');
const [N, K] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(Number);

const dp = Array.from({ length: N + 1 }, () => new Int32Array(N + 1));

for (let i = 0; i <= N; i++) {
    for (let j = 0; j <= i; j++) {
        if (j === 0 || j === i) {
            dp[i][j] = 1;
        } else {
            dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j]) % 10007;
        }
    }
}
console.log(dp[N][K]);`
        }
    },
    {
        type: 'problem_detail',
        title: '6. 다리 놓기 (BOJ 1010)',
        problem: '서쪽의 N개 사이트와 동쪽의 M개 사이트를 다리로 연결하려고 한다. (N ≤ M) 다리는 겹칠 수 없다. 지을 수 있는 다리의 경우의 수를 구하라.',
        input: '테스트 케이스 T. 각 줄에 N, M (0 < N ≤ M < 30).',
        output: '경우의 수 출력',
        example_input_1: `3
2 2
1 5
13 29`,
        example_output_1: `1
5
67863915`
    },
    {
        type: 'problem',
        title: '알고리즘: DP (조합)',
        codes: {
            java: `import java.io.*;
import java.util.*;

public class bj6_1010 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int t = Integer.parseInt(br.readLine());
        int[][] dp = new int[30][30];

        for (int i = 0; i < 30; i++) {
            dp[i][i] = 1;
            dp[i][0] = 1;
        }

        for (int i = 2; i < 30; i++) {
            for (int j = 1; j < 30; j++) {
                dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
            }
        }

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < t; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            int n = Integer.parseInt(st.nextToken());
            int m = Integer.parseInt(st.nextToken());
            sb.append(dp[m][n]).append("\\n");
        }
        System.out.print(sb);
    }
}`,
            python: `import sys
input = sys.stdin.readline

dp = [[0] * 30 for _ in range(30)]

for i in range(30):
    dp[i][i] = 1
    dp[i][0] = 1

for i in range(2, 30):
    for j in range(1, 30):
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]

t = int(input())
for _ in range(t):
    n, m = map(int, input().split())
    print(dp[m][n])`,
            javascript: `const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\\n');

const T = Number(input[0]);
const dp = Array.from({ length: 30 }, () => new Int32Array(30));

for (let i = 0; i < 30; i++) {
    dp[i][i] = 1;
    dp[i][0] = 1;
}

for (let i = 2; i < 30; i++) {
    for (let j = 1; j < 30; j++) {
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
    }
}

const output = [];
for (let i = 1; i <= T; i++) {
    const [N, M] = input[i].split(' ').map(Number);
    output.push(dp[M][N]);
}
console.log(output.join('\\n'));`
        }
    },
    {
        type: 'problem_detail',
        title: '7. 순열의 순서 (BOJ 1722)',
        problem: '1부터 N까지의 수로 이루어진 순열이 있다. 1) K번째 순열을 구하거나 2) 주어진 순열이 몇 번째인지 구하시오.',
        input: 'N(1≤N≤20). 소문제 번호(1 or 2). 1이면 K, 2면 순열.',
        output: '1이면 순열 출력, 2면 순서 출력.',
        example_input_1: `4
1 3`,
        example_output_1: `1 3 2 4`
    },
    {
        type: 'problem',
        title: '알고리즘: 수학 (팩토리얼)',
        codes: {
            java: `import java.io.*;
import java.util.*;

public class bj7_1722 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        StringTokenizer st = new StringTokenizer(br.readLine());
        int option = Integer.parseInt(st.nextToken());

        long[] fact = new long[21];
        fact[0] = 1;
        for (int i = 1; i <= 20; i++) fact[i] = fact[i - 1] * i;

        boolean[] visited = new boolean[21];
        int[] arr = new int[n];

        if (option == 1) {
            long k = Long.parseLong(st.nextToken());
            for (int i = 0; i < n; i++) {
                for (int j = 1; j <= n; j++) {
                    if (visited[j]) continue;
                    if (k <= fact[n - 1 - i]) {
                        arr[i] = j;
                        visited[j] = true;
                        break;
                    }
                    k -= fact[n - 1 - i];
                }
            }
            for (int i = 0; i < n; i++) System.out.print(arr[i] + " ");
        } else {
            for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());
            long result = 1;
            for (int i = 0; i < n; i++) {
                for (int j = 1; j < arr[i]; j++) {
                    if (!visited[j]) {
                        result += fact[n - 1 - i];
                    }
                }
                visited[arr[i]] = true;
            }
            System.out.println(result);
        }
    }
}`,
            python: `import sys
input = sys.stdin.readline

n = int(input())
query = list(map(int, input().split()))
option = query[0]

fact = [1] * 21
for i in range(1, 21):
    fact[i] = fact[i - 1] * i

visited = [False] * 21

if option == 1:
    k = query[1]
    result = []
    for i in range(n):
        for j in range(1, n + 1):
            if visited[j]: continue
            if k <= fact[n - 1 - i]:
                result.append(j)
                visited[j] = True
                break
            k -= fact[n - 1 - i]
    print(*result)
else:
    arr = query[1:]
    result = 1
    for i in range(n):
        for j in range(1, arr[i]):
            if not visited[j]:
                result += fact[n - 1 - i]
        visited[arr[i]] = True
    print(result)`,
            javascript: `const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\\n');

const N = Number(input[0]);
const query = input[1].split(' ').map(BigInt);
const option = query[0];

const fact = new BigInt64Array(21);
fact[0] = 1n;
for (let i = 1; i <= 20; i++) fact[i] = fact[i - 1] * BigInt(i);

const visited = new Uint8Array(21);

if (option === 1n) {
    let k = query[1];
    const result = [];
    for (let i = 0; i < N; i++) {
        for (let j = 1; j <= N; j++) {
            if (visited[j]) continue;
            if (k <= fact[N - 1 - i]) {
                result.push(j);
                visited[j] = 1;
                break;
            }
            k -= fact[N - 1 - i];
        }
    }
    console.log(result.join(' '));
} else {
    const arr = input[1].split(' ').slice(1).map(Number);
    let result = 1n;
    for (let i = 0; i < N; i++) {
        for (let j = 1; j < arr[i]; j++) {
            if (!visited[j]) result += fact[N - 1 - i];
        }
        visited[arr[i]] = 1;
    }
    console.log(result.toString());
}`
        }
    },
    {
        type: 'problem_detail',
        title: '8. 사전 (BOJ 1256)',
        problem: "'a' N개와 'z' M개로 만들 수 있는 문자열을 사전순으로 정렬했을 때, K번째 문자열을 구하시오.",
        input: 'N, M, K (1 ≤ N, M ≤ 100, 1 ≤ K ≤ 1,000,000,000)',
        output: 'K번째 문자열 출력. 만약 문자열 개수가 K보다 작으면 -1 출력.',
        example_input_1: `2 2 2`,
        example_output_1: `azaz`
    },
    {
        type: 'problem',
        title: '알고리즘: DP + 조합론',
        codes: {
            java: `import java.io.*;
import java.util.*;

public class bj8_1256 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        int m = Integer.parseInt(st.nextToken());
        long k = Long.parseLong(st.nextToken());

        long[][] dp = new long[201][201];
        for (int i = 0; i <= 200; i++) {
            dp[i][0] = 1;
            for (int j = 1; j <= i; j++) {
                dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
                if (dp[i][j] > 1000000000) dp[i][j] = 1000000001;
            }
        }

        if (dp[n + m][m] < k) {
            System.out.println("-1");
            return;
        }

        StringBuilder sb = new StringBuilder();
        while (n > 0 || m > 0) {
            long aCount = (n > 0) ? dp[n + m - 1][m] : 0;
            if (n > 0 && k <= aCount) {
                sb.append("a");
                n--;
            } else {
                sb.append("z");
                k -= aCount;
                m--;
            }
        }
        System.out.println(sb);
    }
}`,
            python: `import sys
input = sys.stdin.readline

n, m, k = map(int, input().split())
dp = [[0] * 201 for _ in range(201)]
limit = 1000000000

for i in range(201):
    dp[i][0] = 1
    for j in range(1, i + 1):
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]
        if dp[i][j] > limit:
            dp[i][j] = limit + 1

if dp[n + m][m] < k:
    print("-1")
else:
    result = []
    while n > 0 or m > 0:
        a_count = dp[n + m - 1][m] if n > 0 else 0
        if n > 0 and k <= a_count:
            result.append("a")
            n -= 1
        else:
            result.append("z")
            k -= a_count
            m -= 1
    print("".join(result))`,
            javascript: `const fs = require('fs');
const [N, M, K_Input] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(Number);

let n = N;
let m = M;
let k = BigInt(K_Input);

const dp = Array.from({ length: 201 }, () => new BigInt64Array(201));
const MAX = 1000000000n;

for (let i = 0; i <= 200; i++) {
    dp[i][0] = 1n;
    for (let j = 1; j <= i; j++) {
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
        if (dp[i][j] > MAX) dp[i][j] = MAX + 1n;
    }
}

if (dp[n + m][m] < k) {
    console.log("-1");
    process.exit(0);
}

let result = "";
while (n > 0 || m > 0) {
    let aCount = (n > 0) ? dp[n + m - 1][m] : 0n;

    if (n > 0 && k <= aCount) {
        result += "a";
        n--;
    } else {
        result += "z";
        k -= aCount;
        m--;
    }
}
console.log(result);`
        }
    }
];