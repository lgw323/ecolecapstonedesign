// data.js
const presentationData = [
    {
        type: 'title',
        title: '알고리즘 13문제 (7주차)',
        author: '경성대학교 소프트웨어학과',
        author_detail: '2021663046 이건우'
    },
    {
        type: 'toc',
        title: '발표 순서',
        items: [
            '1로 만들기 (BOJ 1463)',
            '퇴사 (BOJ 14501)',
            '이친수 (BOJ 2193)',
            '2×n 타일링 (BOJ 11726)',
            'LCS 2 (BOJ 9252)',
            '가장 큰 정사각형 (BOJ 1915)',
            '행렬 곱셈 순서 (BOJ 11049)',
            '외판원 순회 (BOJ 2098)',
            'LIS 5 (BOJ 14003)',
            'CCW (BOJ 11758)',
            '선분 교차 2 (BOJ 17387)',
            '선분 그룹 (BOJ 2162)',
            '다각형의 면적 (BOJ 2166)'
        ]
    },
    {
        type: 'problem_set',
        title: '1. 1로 만들기 (BOJ 1463)',
        problem: '정수 X에 사용할 수 있는 연산은 다음과 같이 세 가지 이다.\n1. X가 3으로 나누어 떨어지면, 3으로 나눈다.\n2. X가 2로 나누어 떨어지면, 2로 나눈다.\n3. 1을 뺀다.\n정수 N이 주어졌을 때, 위와 같은 연산 세 개를 적절히 사용해서 1을 만들려고 한다. 연산을 사용하는 횟수의 최솟값을 출력하시오.',
        input: '첫째 줄에 1보다 크거나 같고, 10^6보다 작거나 같은 정수 N이 주어진다.',
        output: '첫째 줄에 연산을 하는 횟수의 최솟값을 출력한다.',
        example_input_1: `10`,
        example_output_1: `3`
    },
    {
        type: 'problem',
        title: '1. 1로 만들기 (코드)',
        codes: {
            java: `import java.io.*;
public class bj1_1463 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        int[] dp = new int[n + 1];
        dp[1] = 0;
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + 1;
            if (i % 2 == 0) dp[i] = Math.min(dp[i], dp[i / 2] + 1);
            if (i % 3 == 0) dp[i] = Math.min(dp[i], dp[i / 3] + 1);
        }
        System.out.println(dp[n]);
    }
}`,
            python: `import sys
n = int(sys.stdin.readline())
dp = [0] * (n + 1)
for i in range(2, n + 1):
    dp[i] = dp[i - 1] + 1
    if i % 2 == 0: dp[i] = min(dp[i], dp[i // 2] + 1)
    if i % 3 == 0: dp[i] = min(dp[i], dp[i // 3] + 1)
print(dp[n])`,
            javascript: `const fs = require('fs');
const n = Number(fs.readFileSync('/dev/stdin').toString().trim());
const dp = new Int32Array(n + 1);
dp[1] = 0;
for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + 1;
    if (i % 2 === 0) dp[i] = Math.min(dp[i], dp[i / 2] + 1);
    if (i % 3 === 0) dp[i] = Math.min(dp[i], dp[i / 3] + 1);
}
console.log(dp[n]);`
        }
    },
    {
        type: 'problem_set',
        title: '2. 퇴사 (BOJ 14501)',
        problem: '오늘부터 N+1일째 되는 날 퇴사를 하기 위해서, 남은 N일 동안 최대한 많은 상담을 하려고 한다. N일 동안 상담을 적절히 했을 때, 얻을 수 있는 최대 수익을 구하시오.',
        input: '첫째 줄에 N (1 ≤ N ≤ 15)이 주어진다. 둘째 줄부터 N개의 줄에 Ti와 Pi가 주어진다.',
        output: '첫째 줄에 백준이가 얻을 수 있는 최대 이익을 출력한다.',
        example_input_1: `7\n3 10\n5 20\n1 10\n1 20\n2 15\n4 40\n2 200`,
        example_output_1: `45`
    },
    {
        type: 'problem',
        title: '2. 퇴사 (코드)',
        codes: {
            java: `import java.io.*;
import java.util.*;
public class bj2_14501 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        int[] t = new int[n];
        int[] p = new int[n];
        for (int i = 0; i < n; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            t[i] = Integer.parseInt(st.nextToken());
            p[i] = Integer.parseInt(st.nextToken());
        }
        int[] dp = new int[n + 1];
        for (int i = n - 1; i >= 0; i--) {
            if (i + t[i] > n) dp[i] = dp[i + 1];
            else dp[i] = Math.max(dp[i + 1], p[i] + dp[i + t[i]]);
        }
        System.out.println(dp[0]);
    }
}`,
            python: `import sys
n = int(sys.stdin.readline())
t, p = [], []
dp = [0] * (n + 1)
for _ in range(n):
    time, pay = map(int, sys.stdin.readline().split())
    t.append(time); p.append(pay)
for i in range(n - 1, -1, -1):
    if i + t[i] > n: dp[i] = dp[i + 1]
    else: dp[i] = max(dp[i + 1], p[i] + dp[i + t[i]])
print(dp[0])`,
            javascript: `const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\\n');
const n = Number(input[0]);
const t = [], p = [];
for (let i = 1; i <= n; i++) {
    const [time, pay] = input[i].split(' ').map(Number);
    t.push(time); p.push(pay);
}
const dp = new Int32Array(n + 1);
for (let i = n - 1; i >= 0; i--) {
    if (i + t[i] > n) dp[i] = dp[i + 1];
    else dp[i] = Math.max(dp[i + 1], p[i] + dp[i + t[i]]);
}
console.log(dp[0]);`
        }
    },
    {
        type: 'problem_set',
        title: '3. 이친수 (BOJ 2193)',
        problem: '0과 1로만 이루어진 수를 이진수라 한다. 이친수는 0으로 시작하지 않고, 1이 두 번 연속으로 나타나지 않는다. N자리 이친수의 개수를 구하시오.',
        input: '첫째 줄에 N(1 ≤ N ≤ 90)이 주어진다.',
        output: '첫째 줄에 N자리 이친수의 개수를 출력한다.',
        example_input_1: `3`,
        example_output_1: `2`
    },
    {
        type: 'problem',
        title: '3. 이친수 (코드)',
        codes: {
            java: `import java.io.*;
public class bj3_2193 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        long[] dp = new long[n + 1];
        dp[1] = 1;
        if (n >= 2) dp[2] = 1;
        for (int i = 3; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
        System.out.println(dp[n]);
    }
}`,
            python: `import sys
n = int(sys.stdin.readline())
dp = [0] * (n + 1)
dp[1] = 1
if n >= 2: dp[2] = 1
for i in range(3, n + 1): dp[i] = dp[i - 1] + dp[i - 2]
print(dp[n])`,
            javascript: `const fs = require('fs');
const n = Number(fs.readFileSync('/dev/stdin').toString().trim());
const dp = Array(n + 1).fill(0n);
dp[1] = 1n;
if (n >= 2) dp[2] = 1n;
for (let i = 3; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
console.log(dp[n].toString());`
        }
    },
    {
        type: 'problem_set',
        title: '4. 2×n 타일링 (BOJ 11726)',
        problem: '2×n 크기의 직사각형을 1×2, 2×1 타일로 채우는 방법의 수를 구하는 프로그램을 작성하시오. (10,007로 나눈 나머지 출력)',
        input: '첫째 줄에 n이 주어진다. (1 ≤ n ≤ 1,000)',
        output: '첫째 줄에 2×n 크기의 직사각형을 채우는 방법의 수를 10,007로 나눈 나머지를 출력한다.',
        example_input_1: `9`,
        example_output_1: `55`
    },
    {
        type: 'problem',
        title: '4. 2×n 타일링 (코드)',
        codes: {
            java: `import java.io.*;
public class bj4_11726 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        int[] dp = new int[1001];
        dp[1] = 1; dp[2] = 2;
        for (int i = 3; i <= n; i++) dp[i] = (dp[i - 1] + dp[i - 2]) % 10007;
        System.out.println(dp[n]);
    }
}`,
            python: `import sys
n = int(sys.stdin.readline())
dp = [0] * 1001
dp[1] = 1; dp[2] = 2
for i in range(3, n + 1): dp[i] = (dp[i - 1] + dp[i - 2]) % 10007
print(dp[n])`,
            javascript: `const fs = require('fs');
const n = Number(fs.readFileSync('/dev/stdin').toString().trim());
const dp = new Int32Array(1001);
dp[1] = 1; dp[2] = 2;
for (let i = 3; i <= n; i++) dp[i] = (dp[i - 1] + dp[i - 2]) % 10007;
console.log(dp[n]);`
        }
    },
    {
        type: 'problem_set',
        title: '5. LCS 2 (BOJ 9252)',
        problem: '두 수열의 최장 공통 부분 수열(LCS)을 구하고, 그 길이와 실제 수열을 출력하시오.',
        input: '두 문자열이 주어진다. (최대 1000글자)',
        output: '첫째 줄에 LCS의 길이를, 둘째 줄에 LCS를 출력한다.',
        example_input_1: `ACAYKP\nCAPCAK`,
        example_output_1: `4\nACAK`
    },
    {
        type: 'problem',
        title: '5. LCS 2 (코드)',
        codes: {
            java: `import java.io.*;
public class bj5_9252 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        char[] s1 = br.readLine().toCharArray();
        char[] s2 = br.readLine().toCharArray();
        int n = s1.length, m = s2.length;
        int[][] dp = new int[n + 1][m + 1];
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s1[i - 1] == s2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
                else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
        System.out.println(dp[n][m]);
        StringBuilder sb = new StringBuilder();
        int i = n, j = m;
        while (i > 0 && j > 0) {
            if (dp[i][j] == dp[i - 1][j]) i--;
            else if (dp[i][j] == dp[i][j - 1]) j--;
            else { sb.append(s1[i - 1]); i--; j--; }
        }
        System.out.println(sb.reverse());
    }
}`,
            python: `import sys
s1 = sys.stdin.readline().strip()
s2 = sys.stdin.readline().strip()
n, m = len(s1), len(s2)
dp = [[0] * (m + 1) for _ in range(n + 1)]
for i in range(1, n + 1):
    for j in range(1, m + 1):
        if s1[i - 1] == s2[j - 1]: dp[i][j] = dp[i - 1][j - 1] + 1
        else: dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
print(dp[n][m])
result = []
i, j = n, m
while i > 0 and j > 0:
    if dp[i][j] == dp[i - 1][j]: i -= 1
    elif dp[i][j] == dp[i][j - 1]: j -= 1
    else: result.append(s1[i - 1]); i -= 1; j -= 1
print("".join(result[::-1]))`,
            javascript: `const fs = require('fs');
const [s1, s2] = fs.readFileSync('/dev/stdin').toString().trim().split('\\n');
const n = s1.length, m = s2.length;
const dp = Array.from({ length: n + 1 }, () => new Int32Array(m + 1));
for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
        if (s1[i - 1] === s2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
        else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
}
console.log(dp[n][m]);
const result = [];
let i = n, j = m;
while (i > 0 && j > 0) {
    if (dp[i][j] === dp[i - 1][j]) i--;
    else if (dp[i][j] === dp[i][j - 1]) j--;
    else { result.push(s1[i - 1]); i--; j--; }
}
console.log(result.reverse().join(''));`
        }
    },
    {
        type: 'problem_set',
        title: '6. 가장 큰 정사각형 (BOJ 1915)',
        problem: 'n×m의 0, 1로 된 배열이 있다. 이 배열에서 1로 된 가장 큰 정사각형의 크기를 구하는 프로그램을 작성하시오.',
        input: '첫째 줄에 n, m(1 ≤ n, m ≤ 1,000)이 주어진다. 다음 n개의 줄에는 배열이 주어진다.',
        output: '첫째 줄에 가장 큰 정사각형의 넓이를 출력한다.',
        example_input_1: `4 4\n0100\n0111\n1110\n0010`,
        example_output_1: `4`
    },
    {
        type: 'problem',
        title: '6. 가장 큰 정사각형 (코드)',
        codes: {
            java: `import java.io.*;
import java.util.*;
public class bj6_1915 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        int m = Integer.parseInt(st.nextToken());
        int[][] dp = new int[n + 1][m + 1];
        int maxLen = 0;
        for (int i = 1; i <= n; i++) {
            String line = br.readLine();
            for (int j = 1; j <= m; j++) {
                if (line.charAt(j - 1) == '1') {
                    dp[i][j] = Math.min(dp[i - 1][j], Math.min(dp[i][j - 1], dp[i - 1][j - 1])) + 1;
                    maxLen = Math.max(maxLen, dp[i][j]);
                }
            }
        }
        System.out.println(maxLen * maxLen);
    }
}`,
            python: `import sys
n, m = map(int, sys.stdin.readline().split())
dp = [[0] * (m + 1) for _ in range(n + 1)]
max_len = 0
for i in range(1, n + 1):
    line = sys.stdin.readline().strip()
    for j in range(1, m + 1):
        if line[j - 1] == "1":
            dp[i][j] = min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
            max_len = max(max_len, dp[i][j])
print(max_len * max_len)`,
            javascript: `const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\\n');
const [n, m] = input[0].split(' ').map(Number);
const dp = Array.from({ length: n + 1 }, () => new Int32Array(m + 1));
let maxLen = 0;
for (let i = 1; i <= n; i++) {
    const line = input[i];
    for (let j = 1; j <= m; j++) {
        if (line[j - 1] === '1') {
            dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
            maxLen = Math.max(maxLen, dp[i][j]);
        }
    }
}
console.log(maxLen * maxLen);`
        }
    },
    {
        type: 'problem_set',
        title: '7. 행렬 곱셈 순서 (BOJ 11049)',
        problem: '행렬 N개를 곱하는데 필요한 곱셈 연산의 최솟값을 구하시오.',
        input: '첫째 줄에 행렬의 개수 N(1 ≤ N ≤ 500)이 주어진다. 이후 N개 줄에 행렬의 크기가 주어진다.',
        output: '최소 연산 횟수를 출력한다.',
        example_input_1: `3\n5 3\n3 2\n2 6`,
        example_output_1: `90`
    },

    // [심화 1] 템플릿 참조형으로 변경
    {
        type: 'fullscreen_visual',
        title: '심화 1: 행렬 결합의 법칙',
        contentId: 'DIMENSION_RULE'
    },

    // [심화 2] 템플릿 참조형으로 변경
    {
        type: 'fullscreen_visual',
        title: '심화 2: 계산의 정체',
        contentId: 'SCALAR_PRODUCT'
    },

    // [심화 3] 템플릿 참조형으로 변경
    {
        type: 'fullscreen_visual',
        title: '심화 3: 크기 비교',
        contentId: 'SIZE_COMPARISON'
    },

    // [심화 4] 템플릿 참조형으로 변경 (New)
    {
        type: 'fullscreen_visual',
        title: '심화 4: 전략 (DP Table)',
        contentId: 'DP_STRATEGY'
    },

    // [심화 5] 템플릿 참조형으로 변경 (New)
    {
        type: 'fullscreen_visual',
        title: '심화 5: 전술 (Optimal Split)',
        contentId: 'OPTIMAL_SPLIT'
    },

    {
        type: 'problem',
        title: '7. 행렬 곱셈 순서 (코드)',
        codes: {
            java: `import java.io.*;
import java.util.*;
public class bj7_11049 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        int[][] matrix = new int[n][2];
        for (int i = 0; i < n; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            matrix[i][0] = Integer.parseInt(st.nextToken());
            matrix[i][1] = Integer.parseInt(st.nextToken());
        }
        int[][] dp = new int[n][n];
        for (int gap = 1; gap < n; gap++) {
            for (int i = 0; i + gap < n; i++) {
                int j = i + gap;
                dp[i][j] = Integer.MAX_VALUE;
                for (int k = i; k < j; k++) {
                    int cost = dp[i][k] + dp[k + 1][j] + matrix[i][0] * matrix[k][1] * matrix[j][1];
                    dp[i][j] = Math.min(dp[i][j], cost);
                }
            }
        }
        System.out.println(dp[0][n - 1]);
    }
}`,
            python: `import sys
n = int(sys.stdin.readline())
matrix = [list(map(int, sys.stdin.readline().split())) for _ in range(n)]
dp = [[0] * n for _ in range(n)]
for gap in range(1, n):
    for i in range(n - gap):
        j = i + gap
        dp[i][j] = float("inf")
        for k in range(i, j):
            cost = dp[i][k] + dp[k + 1][j] + matrix[i][0] * matrix[k][1] * matrix[j][1]
            dp[i][j] = min(dp[i][j], cost)
print(dp[0][n - 1])`,
            javascript: `const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\\n');
const n = Number(input[0]);
const matrix = [];
for (let i = 1; i <= n; i++) matrix.push(input[i].split(' ').map(Number));
const dp = Array.from({ length: n }, () => new Int32Array(n).fill(0));
for (let gap = 1; gap < n; gap++) {
    for (let i = 0; i + gap < n; i++) {
        const j = i + gap;
        dp[i][j] = Infinity;
        for (let k = i; k < j; k++) {
            const cost = dp[i][k] + dp[k + 1][j] + matrix[i][0] * matrix[k][1] * matrix[j][1];
            dp[i][j] = Math.min(dp[i][j], cost);
        }
    }
}
console.log(dp[0][n - 1]);`
        }
    },
    {
        type: 'problem_set',
        title: '8. 외판원 순회 (BOJ 2098)',
        problem: '외판원 순회 문제는 어느 한 도시에서 출발해 N개의 도시를 모두 거쳐 다시 원래의 도시로 돌아오는 순회 여행 경로 계획을 세우는 것이다. 단 한 번 갔던 도시는 다시 갈 수 없다. 최소 비용을 구하시오.',
        input: '첫째 줄에 도시의 수 N(2 ≤ N ≤ 16)이 주어진다. 다음 N개의 줄에는 비용 행렬이 주어진다.',
        output: '최소 비용을 출력한다.',
        example_input_1: `4\n0 10 15 20\n5 0 9 10\n6 13 0 12\n8 8 9 0`,
        example_output_1: `35`
    },
    {
        type: 'problem',
        title: '8. 외판원 순회 (코드)',
        codes: {
            java: `import java.io.*;
import java.util.*;
public class bj8_2098 {
    static int n;
    static int[][] w;
    static int[][] dp;
    static final int INF = 16_000_000;
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        n = Integer.parseInt(br.readLine());
        w = new int[n][n];
        dp = new int[n][(1 << n)];
        for (int i = 0; i < n; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            for (int j = 0; j < n; j++) w[i][j] = Integer.parseInt(st.nextToken());
            Arrays.fill(dp[i], -1);
        }
        System.out.println(tsp(0, 1));
    }
    static int tsp(int current, int visited) {
        if (visited == (1 << n) - 1) return w[current][0] == 0 ? INF : w[current][0];
        if (dp[current][visited] != -1) return dp[current][visited];
        dp[current][visited] = INF;
        for (int i = 0; i < n; i++) {
            if ((visited & (1 << i)) == 0 && w[current][i] != 0) {
                dp[current][visited] = Math.min(dp[current][visited], tsp(i, visited | (1 << i)) + w[current][i]);
            }
        }
        return dp[current][visited];
    }
}`,
            python: `import sys
n = int(sys.stdin.readline())
w = [list(map(int, sys.stdin.readline().split())) for _ in range(n)]
dp = [[-1] * (1 << n) for _ in range(n)]
INF = 16000000
def tsp(current, visited):
    if visited == (1 << n) - 1: return w[current][0] if w[current][0] > 0 else INF
    if dp[current][visited] != -1: return dp[current][visited]
    dp[current][visited] = INF
    for i in range(n):
        if not (visited & (1 << i)) and w[current][i] > 0:
            dp[current][visited] = min(dp[current][visited], tsp(i, visited | (1 << i)) + w[current][i])
    return dp[current][visited]
print(tsp(0, 1))`,
            javascript: `const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\\n');
const n = Number(input[0]);
const w = [];
for (let i = 1; i <= n; i++) w.push(input[i].split(' ').map(Number));
const INF = 16000000;
const dp = Array.from({ length: n }, () => new Int32Array(1 << n).fill(-1));
function tsp(current, visited) {
    if (visited === (1 << n) - 1) return w[current][0] === 0 ? INF : w[current][0];
    if (dp[current][visited] !== -1) return dp[current][visited];
    dp[current][visited] = INF;
    for (let i = 0; i < n; i++) {
        if ((visited & (1 << i)) === 0 && w[current][i] !== 0) {
            dp[current][visited] = Math.min(dp[current][visited], tsp(i, visited | (1 << i)) + w[current][i]);
        }
    }
    return dp[current][visited];
}
console.log(tsp(0, 1));`
        }
    },
    {
        type: 'problem_set',
        title: '9. LIS 5 (BOJ 14003)',
        problem: '수열 A가 주어졌을 때, 가장 긴 증가하는 부분 수열(LIS)을 구하는 프로그램을 작성하시오. N ≤ 1,000,000',
        input: '수열 A의 크기 N, 수열 A의 원소들이 주어진다.',
        output: 'LIS 길이와 수열을 출력한다.',
        example_input_1: `6\n10 20 10 30 20 50`,
        example_output_1: `4\n10 20 30 50`
    },
    {
        type: 'problem',
        title: '9. LIS 5 (코드)',
        codes: {
            java: `import java.io.*;
import java.util.*;
public class bj9_14003 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        int[] arr = new int[n];
        StringTokenizer st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());
        ArrayList<Integer> lis = new ArrayList<>();
        int[] indexRecord = new int[n];
        for (int i = 0; i < n; i++) {
            if (lis.isEmpty() || lis.get(lis.size() - 1) < arr[i]) {
                indexRecord[i] = lis.size(); lis.add(arr[i]);
            } else {
                int left = 0, right = lis.size() - 1;
                while (left < right) {
                    int mid = (left + right) / 2;
                    if (lis.get(mid) >= arr[i]) right = mid;
                    else left = mid + 1;
                }
                lis.set(right, arr[i]); indexRecord[i] = right;
            }
        }
        System.out.println(lis.size());
        Stack<Integer> stack = new Stack<>();
        int targetIdx = lis.size() - 1;
        for (int i = n - 1; i >= 0; i--) {
            if (indexRecord[i] == targetIdx) { stack.push(arr[i]); targetIdx--; }
        }
        StringBuilder sb = new StringBuilder();
        while (!stack.isEmpty()) sb.append(stack.pop()).append(" ");
        System.out.println(sb);
    }
}`,
            python: `import sys
from bisect import bisect_left
n = int(sys.stdin.readline())
arr = list(map(int, sys.stdin.readline().split()))
lis = []
index_record = [0] * n
for i in range(n):
    if not lis or lis[-1] < arr[i]:
        index_record[i] = len(lis)
        lis.append(arr[i])
    else:
        idx = bisect_left(lis, arr[i])
        lis[idx] = arr[i]
        index_record[i] = idx
print(len(lis))
result = []
target_idx = len(lis) - 1
for i in range(n - 1, -1, -1):
    if index_record[i] == target_idx:
        result.append(arr[i])
        target_idx -= 1
print(*result[::-1])`,
            javascript: `const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\\n');
const n = Number(input[0]);
const arr = input[1].split(' ').map(Number);
const lis = [];
const indexRecord = new Int32Array(n);
function lowerBound(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] >= target) right = mid;
        else left = mid + 1;
    }
    return right;
}
for (let i = 0; i < n; i++) {
    if (lis.length === 0 || lis[lis.length - 1] < arr[i]) {
        indexRecord[i] = lis.length; lis.push(arr[i]);
    } else {
        const idx = lowerBound(lis, arr[i]);
        lis[idx] = arr[i]; indexRecord[i] = idx;
    }
}
console.log(lis.length);
const result = [];
let targetIdx = lis.length - 1;
for (let i = n - 1; i >= 0; i--) {
    if (indexRecord[i] === targetIdx) { result.push(arr[i]); targetIdx--; }
}
console.log(result.reverse().join(' '));`
        }
    },
    {
        type: 'problem_set',
        title: '10. CCW (BOJ 11758)',
        problem: '세 점 P1, P2, P3를 순서대로 이은 선분의 방향을 구하시오. (반시계: 1, 시계: -1, 일직선: 0)',
        input: '세 점의 좌표가 주어진다.',
        output: '1, -1, 0 중 하나를 출력한다.',
        example_input_1: `1 1\n5 5\n7 3`,
        example_output_1: `-1`
    },
    {
        type: 'problem',
        title: '10. CCW (코드)',
        codes: {
            java: `import java.io.*;
import java.util.*;
public class bj10_11758 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;
        int[][] p = new int[3][2];
        for (int i = 0; i < 3; i++) {
            st = new StringTokenizer(br.readLine());
            p[i][0] = Integer.parseInt(st.nextToken());
            p[i][1] = Integer.parseInt(st.nextToken());
        }
        int result = (p[1][0] - p[0][0]) * (p[2][1] - p[0][1]) - (p[2][0] - p[0][0]) * (p[1][1] - p[0][1]);
        if (result > 0) System.out.println(1);
        else if (result < 0) System.out.println(-1);
        else System.out.println(0);
    }
}`,
            python: `import sys
p = []
for _ in range(3):
    p.append(list(map(int, sys.stdin.readline().split())))
result = (p[1][0] - p[0][0]) * (p[2][1] - p[0][1]) - (p[2][0] - p[0][0]) * (p[1][1] - p[0][1])
if result > 0: print(1)
elif result < 0: print(-1)
else: print(0)`,
            javascript: `const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\\n');
const p = [];
for (let i = 0; i < 3; i++) p.push(input[i].split(' ').map(Number));
const result = (p[1][0] - p[0][0]) * (p[2][1] - p[0][1]) - (p[2][0] - p[0][0]) * (p[1][1] - p[0][1]);
if (result > 0) console.log(1);
else if (result < 0) console.log(-1);
else console.log(0);`
        }
    },
    {
        type: 'problem_set',
        title: '11. 선분 교차 2 (BOJ 17387)',
        problem: '두 선분 L1, L2가 교차하는지 판별하시오.',
        input: '두 선분의 양 끝 점 좌표가 주어진다.',
        output: '교차하면 1, 아니면 0을 출력한다.',
        example_input_1: `1 1 5 5\n1 5 5 1`,
        example_output_1: `1`
    },
    {
        type: 'problem',
        title: '11. 선분 교차 2 (코드)',
        codes: {
            java: `import java.io.*;
import java.util.*;
public class bj11_17387 {
    static class Point { long x, y; public Point(long x, long y) { this.x = x; this.y = y; } }
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        Point p1 = new Point(Long.parseLong(st.nextToken()), Long.parseLong(st.nextToken()));
        Point p2 = new Point(Long.parseLong(st.nextToken()), Long.parseLong(st.nextToken()));
        st = new StringTokenizer(br.readLine());
        Point p3 = new Point(Long.parseLong(st.nextToken()), Long.parseLong(st.nextToken()));
        Point p4 = new Point(Long.parseLong(st.nextToken()), Long.parseLong(st.nextToken()));
        System.out.println(checkIntersection(p1, p2, p3, p4));
    }
    static int ccw(Point p1, Point p2, Point p3) {
        long res = (p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y);
        if (res > 0) return 1; else if (res < 0) return -1; return 0;
    }
    static int checkIntersection(Point p1, Point p2, Point p3, Point p4) {
        int ccw1 = ccw(p1, p2, p3), ccw2 = ccw(p1, p2, p4);
        int ccw3 = ccw(p3, p4, p1), ccw4 = ccw(p3, p4, p2);
        if (ccw1 * ccw2 == 0 && ccw3 * ccw4 == 0) {
            if (Math.min(p1.x, p2.x) <= Math.max(p3.x, p4.x) && Math.min(p3.x, p4.x) <= Math.max(p1.x, p2.x) &&
                Math.min(p1.y, p2.y) <= Math.max(p3.y, p4.y) && Math.min(p3.y, p4.y) <= Math.max(p1.y, p2.y)) return 1;
            return 0;
        }
        if (ccw1 * ccw2 <= 0 && ccw3 * ccw4 <= 0) return 1;
        return 0;
    }
}`,
            python: `import sys
def ccw(x1, y1, x2, y2, x3, y3):
    temp = (x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1)
    if temp > 0: return 1
    elif temp < 0: return -1
    return 0
x1, y1, x2, y2 = map(int, sys.stdin.readline().split())
x3, y3, x4, y4 = map(int, sys.stdin.readline().split())
ans1 = ccw(x1, y1, x2, y2, x3, y3)
ans2 = ccw(x1, y1, x2, y2, x4, y4)
ans3 = ccw(x3, y3, x4, y4, x1, y1)
ans4 = ccw(x3, y3, x4, y4, x2, y2)
if ans1 * ans2 == 0 and ans3 * ans4 == 0:
    if min(x1, x2) <= max(x3, x4) and min(x3, x4) <= max(x1, x2) and min(y1, y2) <= max(y3, y4) and min(y3, y4) <= max(y1, y2): print(1)
    else: print(0)
elif ans1 * ans2 <= 0 and ans3 * ans4 <= 0: print(1)
else: print(0)`,
            javascript: `const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\\n');
const [x1, y1, x2, y2] = input[0].split(' ').map(BigInt);
const [x3, y3, x4, y4] = input[1].split(' ').map(BigInt);
function ccw(ax, ay, bx, by, cx, cy) {
    const res = (bx - ax) * (cy - ay) - (cx - ax) * (by - ay);
    if (res > 0n) return 1; if (res < 0n) return -1; return 0;
}
const ans1 = ccw(x1, y1, x2, y2, x3, y3);
const ans2 = ccw(x1, y1, x2, y2, x4, y4);
const ans3 = ccw(x3, y3, x4, y4, x1, y1);
const ans4 = ccw(x3, y3, x4, y4, x2, y2);
if (ans1 * ans2 === 0 && ans3 * ans4 === 0) {
    let [minX1, maxX1] = x1 < x2 ? [x1, x2] : [x2, x1];
    let [minX3, maxX3] = x3 < x4 ? [x3, x4] : [x4, x3];
    let [minY1, maxY1] = y1 < y2 ? [y1, y2] : [y2, y1];
    let [minY3, maxY3] = y3 < y4 ? [y3, y4] : [y4, y3];
    if (minX1 <= maxX3 && minX3 <= maxX1 && minY1 <= maxY3 && minY3 <= maxY1) console.log(1);
    else console.log(0);
} else if (ans1 * ans2 <= 0 && ans3 * ans4 <= 0) console.log(1);
else console.log(0);`
        }
    },
    {
        type: 'problem_set',
        title: '12. 선분 그룹 (BOJ 2162)',
        problem: 'N개의 선분들이 주어졌을 때, 서로 교차하거나 만나는 선분들을 그룹으로 묶는다. 전체 그룹 개수와 가장 큰 그룹의 크기를 구하시오.',
        input: '첫째 줄에 N이 주어진다. 이후 N개의 선분 정보가 주어진다.',
        output: '그룹 개수와 가장 큰 그룹의 크기를 출력한다.',
        example_input_1: `3\n1 1 2 3\n2 1 0 0\n1 0 1 1`,
        example_output_1: `1\n3`
    },
    {
        type: 'problem',
        title: '12. 선분 그룹 (코드)',
        codes: {
            java: `import java.io.*;
import java.util.*;
public class bj12_2162 {
    static class Line { Point p1, p2; public Line(Point p1, Point p2) { this.p1 = p1; this.p2 = p2; } }
    static class Point { long x, y; public Point(long x, long y) { this.x = x; this.y = y; } }
    static int[] parent, size;
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        Line[] lines = new Line[n + 1];
        parent = new int[n + 1]; size = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            lines[i] = new Line(new Point(Long.parseLong(st.nextToken()), Long.parseLong(st.nextToken())), new Point(Long.parseLong(st.nextToken()), Long.parseLong(st.nextToken())));
            parent[i] = i; size[i] = 1;
        }
        for (int i = 1; i <= n; i++) {
            for (int j = i + 1; j <= n; j++) { if (checkIntersection(lines[i].p1, lines[i].p2, lines[j].p1, lines[j].p2)) union(i, j); }
        }
        int groupCount = 0, maxSize = 0;
        for (int i = 1; i <= n; i++) { if (parent[i] == i) { groupCount++; maxSize = Math.max(maxSize, size[i]); } }
        System.out.println(groupCount); System.out.println(maxSize);
    }
    static int find(int x) { if (parent[x] == x) return x; return parent[x] = find(parent[x]); }
    static void union(int a, int b) { int rootA = find(a), rootB = find(b); if (rootA != rootB) { parent[rootB] = rootA; size[rootA] += size[rootB]; } }
    static int ccw(Point p1, Point p2, Point p3) { long res = (p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y); return res > 0 ? 1 : (res < 0 ? -1 : 0); }
    static boolean checkIntersection(Point p1, Point p2, Point p3, Point p4) {
        int ccw1 = ccw(p1, p2, p3), ccw2 = ccw(p1, p2, p4), ccw3 = ccw(p3, p4, p1), ccw4 = ccw(p3, p4, p2);
        if (ccw1 * ccw2 == 0 && ccw3 * ccw4 == 0) return Math.min(p1.x, p2.x) <= Math.max(p3.x, p4.x) && Math.min(p3.x, p4.x) <= Math.max(p1.x, p2.x) && Math.min(p1.y, p2.y) <= Math.max(p3.y, p4.y) && Math.min(p3.y, p4.y) <= Math.max(p1.y, p2.y);
        return ccw1 * ccw2 <= 0 && ccw3 * ccw4 <= 0;
    }
}`,
            python: `import sys
def find(x):
    if parent[x] == x: return x
    parent[x] = find(parent[x])
    return parent[x]
def union(a, b):
    rootA = find(a); rootB = find(b)
    if rootA != rootB: parent[rootB] = rootA; size[rootA] += size[rootB]
def ccw(x1, y1, x2, y2, x3, y3):
    temp = (x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1)
    return 1 if temp > 0 else (-1 if temp < 0 else 0)
def check(l1, l2):
    x1, y1, x2, y2 = l1; x3, y3, x4, y4 = l2
    ans1 = ccw(x1, y1, x2, y2, x3, y3); ans2 = ccw(x1, y1, x2, y2, x4, y4)
    ans3 = ccw(x3, y3, x4, y4, x1, y1); ans4 = ccw(x3, y3, x4, y4, x2, y2)
    if ans1 * ans2 == 0 and ans3 * ans4 == 0:
        return min(x1, x2) <= max(x3, x4) and min(x3, x4) <= max(x1, x2) and min(y1, y2) <= max(y3, y4) and min(y3, y4) <= max(y1, y2)
    return ans1 * ans2 <= 0 and ans3 * ans4 <= 0
n = int(sys.stdin.readline())
lines = []; parent = [i for i in range(n)]; size = [1] * n
for _ in range(n): lines.append(list(map(int, sys.stdin.readline().split())))
for i in range(n):
    for j in range(i + 1, n):
        if check(lines[i], lines[j]): union(i, j)
group_count = 0; max_size = 0
for i in range(n):
    if parent[i] == i: group_count += 1; max_size = max(max_size, size[i])
print(group_count); print(max_size)`,
            javascript: `const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\\n');
const n = Number(input[0]);
const lines = [];
for (let i = 1; i <= n; i++) lines.push(input[i].split(' ').map(BigInt));
const parent = Array.from({ length: n }, (_, i) => i);
const size = new Int32Array(n).fill(1);
function find(x) { if (parent[x] === x) return x; return parent[x] = find(parent[x]); }
function union(a, b) { const rootA = find(a), rootB = find(b); if (rootA !== rootB) { parent[rootB] = rootA; size[rootA] += size[rootB]; } }
function ccw(ax, ay, bx, by, cx, cy) { const res = (bx - ax) * (cy - ay) - (cx - ax) * (by - ay); return res > 0n ? 1 : (res < 0n ? -1 : 0); }
function check(l1, l2) {
    const [x1, y1, x2, y2] = l1, [x3, y3, x4, y4] = l2;
    const ans1 = ccw(x1, y1, x2, y2, x3, y3), ans2 = ccw(x1, y1, x2, y2, x4, y4);
    const ans3 = ccw(x3, y3, x4, y4, x1, y1), ans4 = ccw(x3, y3, x4, y4, x2, y2);
    if (ans1 * ans2 === 0 && ans3 * ans4 === 0) {
        const [minX1, maxX1] = x1 < x2 ? [x1, x2] : [x2, x1], [minX3, maxX3] = x3 < x4 ? [x3, x4] : [x4, x3];
        const [minY1, maxY1] = y1 < y2 ? [y1, y2] : [y2, y1], [minY3, maxY3] = y3 < y4 ? [y3, y4] : [y4, y3];
        return minX1 <= maxX3 && minX3 <= maxX1 && minY1 <= maxY3 && minY3 <= maxY1;
    }
    return ans1 * ans2 <= 0 && ans3 * ans4 <= 0;
}
for (let i = 0; i < n; i++) { for (let j = i + 1; j < n; j++) { if (check(lines[i], lines[j])) union(i, j); } }
let groupCount = 0, maxSize = 0;
for (let i = 0; i < n; i++) { if (parent[i] === i) { groupCount++; if (size[i] > maxSize) maxSize = size[i]; } }
console.log(groupCount); console.log(maxSize);`
        }
    },
    {
        type: 'problem_set',
        title: '13. 다각형의 면적 (BOJ 2166)',
        problem: '2차원 좌표 평면 위에 N개의 점으로 이루어진 다각형의 면적을 구하시오. (단, 다각형은 오목하거나 자기 자신과 교차하지 않는다)',
        input: '첫째 줄에 N(3 ≤ N ≤ 10,000). 이후 N개의 줄에 점의 좌표가 주어진다.',
        output: '면적을 소수점 둘째 자리에서 반올림하여 첫째 자리까지 출력한다.',
        example_input_1: `4\n0 0\n0 10\n10 10\n10 0`,
        example_output_1: `100.0`
    },
    {
        type: 'problem',
        title: '13. 다각형의 면적 (코드)',
        codes: {
            java: `import java.io.*;
import java.util.*;
public class bj13_2166 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        long[][] p = new long[n + 1][2];
        for (int i = 0; i < n; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            p[i][0] = Long.parseLong(st.nextToken());
            p[i][1] = Long.parseLong(st.nextToken());
        }
        p[n][0] = p[0][0]; p[n][1] = p[0][1];
        long sumA = 0, sumB = 0;
        for (int i = 0; i < n; i++) {
            sumA += p[i][0] * p[i + 1][1];
            sumB += p[i][1] * p[i + 1][0];
        }
        System.out.printf("%.1f", Math.abs(sumA - sumB) / 2.0);
    }
}`,
            python: `import sys
n = int(sys.stdin.readline())
x, y = [], []
for _ in range(n):
    a, b = map(int, sys.stdin.readline().split())
    x.append(a); y.append(b)
x.append(x[0]); y.append(y[0])
sum_a, sum_b = 0, 0
for i in range(n):
    sum_a += x[i] * y[i + 1]
    sum_b += y[i] * x[i + 1]
print(round(abs(sum_a - sum_b) / 2, 1))`,
            javascript: `const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\\n');
const n = Number(input[0]);
const x = [], y = [];
for (let i = 1; i <= n; i++) {
    const [a, b] = input[i].split(' ').map(BigInt);
    x.push(a); y.push(b);
}
x.push(x[0]); y.push(y[0]);
let sumA = 0n, sumB = 0n;
for (let i = 0; i < n; i++) {
    sumA += x[i] * y[i + 1];
    sumB += y[i] * x[i + 1];
}
let result = sumA - sumB;
if (result < 0n) result = -result;
console.log((Number(result) / 2).toFixed(1));`
        }
    }
];