const presentationData_part1 = [
    {
        type: 'title',
        title: '알고리즘 8문제 (6주차)',
        author: '경성대학교 소프트웨어학과',
        author_detail: '2021663046 이건우'
    },
    {
        type: 'toc',
        title: '발표 순서',
        items: [
            '구간 합 구하기 (BOJ 2042)',
            'LCA (BOJ 11437)',
            'LCA 2 (BOJ 11438) [심화]',
            '이항 계수 1 (BOJ 11050)',
            '이항 계수 2 (BOJ 11051)',
            '다리 놓기 (BOJ 1010)',
            '순열의 순서 (BOJ 1722)',
            '사전 (BOJ 1256)'
        ]
    },
    {
        type: 'problem_detail',
        title: '1. 구간 합 구하기 (BOJ 2042)',
        problem: 'N개의 수가 주어지고, 중간에 수의 변경이 빈번하게 일어난다. 이때 특정 구간의 합을 구하는 프로그램을 작성하시오.',
        input: '첫째 줄에 수의 개수 N(1 ≤ N ≤ 1,000,000)과 M(수 변경 횟수), K(구간 합 구하는 횟수)가 주어진다. 이후 N개의 수가 주어지고, M+K개의 줄에 a, b, c가 주어진다.',
        output: '구간 합을 구하는 명령에 대해 차례대로 정답을 출력한다.',
        example_input_1: `5 2 2
1
2
3
4
5
1 3 6
2 2 5
1 5 2
2 3 5`,
        example_output_1: `17
12`
    },
    {
        type: 'problem',
        title: '알고리즘: 세그먼트 트리',
        codes: {
            java: `import java.io.*;
import java.util.*;

public class bj1_2042 {
    static long[] arr;
    static long[] tree;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        int n = Integer.parseInt(st.nextToken());
        int m = Integer.parseInt(st.nextToken());
        int k = Integer.parseInt(st.nextToken());

        arr = new long[n + 1];
        for (int i = 1; i <= n; i++) {
            arr[i] = Long.parseLong(br.readLine());
        }

        tree = new long[n * 4];
        init(1, 1, n);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < m + k; i++) {
            st = new StringTokenizer(br.readLine());
            int a = Integer.parseInt(st.nextToken());
            int b = Integer.parseInt(st.nextToken());
            long c = Long.parseLong(st.nextToken());

            if (a == 1) {
                long diff = c - arr[b];
                arr[b] = c;
                update(1, 1, n, b, diff);
            } else {
                sb.append(sum(1, 1, n, b, (int) c)).append("\\n");
            }
        }
        System.out.print(sb);
    }

    static long init(int node, int start, int end) {
        if (start == end) return tree[node] = arr[start];
        int mid = (start + end) / 2;
        return tree[node] = init(node * 2, start, mid) + init(node * 2 + 1, mid + 1, end);
    }

    static void update(int node, int start, int end, int index, long diff) {
        if (index < start || index > end) return;
        tree[node] += diff;
        if (start != end) {
            int mid = (start + end) / 2;
            update(node * 2, start, mid, index, diff);
            update(node * 2 + 1, mid + 1, end, index, diff);
        }
    }

    static long sum(int node, int start, int end, int left, int right) {
        if (left > end || right < start) return 0;
        if (left <= start && end <= right) return tree[node];
        int mid = (start + end) / 2;
        return sum(node * 2, start, mid, left, right) + sum(node * 2 + 1, mid + 1, end, left, right);
    }
}`,
            python: `import sys
sys.setrecursionlimit(10**6)
input = sys.stdin.readline

def init(node, start, end):
    if start == end:
        tree[node] = arr[start]
        return tree[node]
    mid = (start + end) // 2
    tree[node] = init(node * 2, start, mid) + init(node * 2 + 1, mid + 1, end)
    return tree[node]

def update(node, start, end, index, diff):
    if index < start or index > end: return
    tree[node] += diff
    if start != end:
        mid = (start + end) // 2
        update(node * 2, start, mid, index, diff)
        update(node * 2 + 1, mid + 1, end, index, diff)

def sum_tree(node, start, end, left, right):
    if left > end or right < start: return 0
    if left <= start and end <= right: return tree[node]
    mid = (start + end) // 2
    return sum_tree(node * 2, start, mid, left, right) + sum_tree(node * 2 + 1, mid + 1, end, left, right)

n, m, k = map(int, input().split())
arr = [0] * (n + 1)
tree = [0] * (n * 4)

for i in range(1, n + 1):
    arr[i] = int(input())

init(1, 1, n)

for _ in range(m + k):
    a, b, c = map(int, input().split())
    if a == 1:
        diff = c - arr[b]
        arr[b] = c
        update(1, 1, n, b, diff)
    else:
        print(sum_tree(1, 1, n, b, c))`,
            javascript: `const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\\n');

const [N, M, K] = input[0].split(' ').map(Number);
const arr = new BigInt64Array(N + 1);
const tree = new BigInt64Array(N * 4);

for (let i = 1; i <= N; i++) {
    arr[i] = BigInt(input[i]);
}

function init(node, start, end) {
    if (start === end) return tree[node] = arr[start];
    const mid = Math.floor((start + end) / 2);
    return tree[node] = init(node * 2, start, mid) + init(node * 2 + 1, mid + 1, end);
}

function update(node, start, end, index, diff) {
    if (index < start || index > end) return;
    tree[node] += diff;
    if (start !== end) {
        const mid = Math.floor((start + end) / 2);
        update(node * 2, start, mid, index, diff);
        update(node * 2 + 1, mid + 1, end, index, diff);
    }
}

function sum(node, start, end, left, right) {
    if (left > end || right < start) return 0n;
    if (left <= start && end <= right) return tree[node];
    const mid = Math.floor((start + end) / 2);
    return sum(node * 2, start, mid, left, right) + sum(node * 2 + 1, mid + 1, end, left, right);
}

init(1, 1, N);

const output = [];
for (let i = N + 1; i < input.length; i++) {
    const [a, b, c] = input[i].split(' ');
    const idx = Number(b);
    if (a === '1') {
        const val = BigInt(c);
        const diff = val - arr[idx];
        arr[idx] = val;
        update(1, 1, N, idx, diff);
    } else {
        output.push(sum(1, 1, N, idx, Number(c)));
    }
}
console.log(output.join('\\n'));`
        }
    },
    {
        type: 'problem_detail',
        title: '2. LCA (BOJ 11437)',
        problem: 'N개의 정점으로 이루어진 트리가 주어진다. 두 노드의 쌍 M개가 주어졌을 때, 두 노드의 가장 가까운 공통 조상(Lowest Common Ancestor)을 구하는 프로그램을 작성하시오.',
        input: '첫째 줄에 N(2 ≤ N ≤ 50,000). 이후 N-1개 줄에 트리 연결 정보. 다음 줄에 M(1 ≤ M ≤ 10,000). 이후 M개 줄에 두 노드.',
        output: 'M개의 줄에 두 노드의 가장 가까운 공통 조상을 출력한다.',
        example_input_1: `15
1 2
1 3
2 4
3 7
6 2
3 8
4 9
2 5
5 11
7 13
10 4
11 15
12 5
14 7
6
6 11
10 9
2 6
7 6
8 13
8 15`,
        example_output_1: `2
4
2
1
3
1`
    },
    {
        type: 'problem',
        title: '알고리즘: 최소 공통 조상 (O(N))',
        codes: {
            java: `import java.io.*;
import java.util.*;

public class bj2_11437 {
    static ArrayList<Integer>[] adj;
    static int[] parent;
    static int[] depth;
    static boolean[] visited;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());

        adj = new ArrayList[n + 1];
        parent = new int[n + 1];
        depth = new int[n + 1];
        visited = new boolean[n + 1];

        for (int i = 1; i <= n; i++) adj[i] = new ArrayList<>();

        for (int i = 0; i < n - 1; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            int a = Integer.parseInt(st.nextToken());
            int b = Integer.parseInt(st.nextToken());
            adj[a].add(b);
            adj[b].add(a);
        }

        dfs(1, 0);

        int m = Integer.parseInt(br.readLine());
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < m; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            int a = Integer.parseInt(st.nextToken());
            int b = Integer.parseInt(st.nextToken());
            sb.append(lca(a, b)).append("\\n");
        }
        System.out.print(sb);
    }

    static void dfs(int node, int d) {
        visited[node] = true;
        depth[node] = d;
        for (int next : adj[node]) {
            if (!visited[next]) {
                parent[next] = node;
                dfs(next, d + 1);
            }
        }
    }

    static int lca(int a, int b) {
        if (depth[a] < depth[b]) {
            int temp = a; a = b; b = temp;
        }
        while (depth[a] != depth[b]) a = parent[a];

        while (a != b) {
            a = parent[a];
            b = parent[b];
        }
        return a;
    }
}`,
            python: `import sys
sys.setrecursionlimit(10**6)
input = sys.stdin.readline

def dfs(node, d):
    visited[node] = True
    depth[node] = d
    for next_node in adj[node]:
        if not visited[next_node]:
            parent[next_node] = node
            dfs(next_node, d + 1)

def lca(a, b):
    if depth[a] < depth[b]:
        a, b = b, a
    while depth[a] != depth[b]:
        a = parent[a]
    while a != b:
        a = parent[a]
        b = parent[b]
    return a

n = int(input())
adj = [[] for _ in range(n + 1)]
parent = [0] * (n + 1)
depth = [0] * (n + 1)
visited = [False] * (n + 1)

for _ in range(n - 1):
    a, b = map(int, input().split())
    adj[a].append(b)
    adj[b].append(a)

dfs(1, 0)

m = int(input())
for _ in range(m):
    a, b = map(int, input().split())
    print(lca(a, b))`,
            javascript: `const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\\n');
let lineIdx = 0;
const N = Number(input[lineIdx++]);

const adj = Array.from({ length: N + 1 }, () => []);
const parent = new Int32Array(N + 1);
const depth = new Int32Array(N + 1);
const visited = new Uint8Array(N + 1);

for (let i = 0; i < N - 1; i++) {
    const [a, b] = input[lineIdx++].split(' ').map(Number);
    adj[a].push(b);
    adj[b].push(a);
}

const stack = [[1, 0]];
visited[1] = 1;

while (stack.length) {
    const [node, d] = stack.pop();
    depth[node] = d;
    for (const next of adj[node]) {
        if (!visited[next]) {
            visited[next] = 1;
            parent[next] = node;
            stack.push([next, d + 1]);
        }
    }
}

const M = Number(input[lineIdx++]);
const output = [];

function lca(a, b) {
    if (depth[a] < depth[b]) [a, b] = [b, a];
    while (depth[a] !== depth[b]) a = parent[a];
    while (a !== b) {
        a = parent[a];
        b = parent[b];
    }
    return a;
}

for (let i = 0; i < M; i++) {
    const [a, b] = input[lineIdx++].split(' ').map(Number);
    output.push(lca(a, b));
}
console.log(output.join('\\n'));`
        }
    },
    {
        type: 'problem_detail',
        title: '3. LCA 2 (BOJ 11438)',
        problem: 'N개의 정점으로 이루어진 트리가 주어진다. 트리의 각 정점은 1번부터 N번까지 번호가 매겨져 있으며, 루트는 1번이다. 두 노드의 쌍 M개가 주어졌을 때, 두 노드의 가장 가까운 공통 조상이 몇 번인지 출력한다.',
        input: '첫째 줄에 N(2 ≤ N ≤ 100,000)이 주어진다. 이후 N-1개 줄에 트리 연결 정보. 다음 줄에 M(1 ≤ M ≤ 100,000). 이후 M개 줄에 두 노드 쌍.',
        output: 'M개의 줄에 차례대로 입력받은 두 정점의 가장 가까운 공통 조상을 출력한다.',
        example_input_1: `15
1 2
1 3
2 4
3 7
6 2
3 8
4 9
2 5
5 11
7 13
10 4
11 15
12 5
14 7
6
6 11
10 9
2 6
7 6
8 13
8 15`,
        example_output_1: `2
4
2
1
3
1`
    },

    // --- [심화 분석] 1. 문제 해부 ---
    {
        type: 'explanation_slide',
        title: '심화 분석 1: 문제 해부',
        content: `
            <h3 class="text-4xl font-bold text-[#0076C0] mb-8">📌 문제 상황 정의</h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 text-3xl text-gray-800 leading-relaxed">
                <div class="bg-[#F7F7F9] p-8 rounded-xl border border-gray-300">
                    <strong class="block mb-4 text-black text-4xl">1. 트리 구조</strong>
                    <p>N개의 정점이 연결되어 있고, 순환(Cycle)이 없는 구조입니다. <strong>1번이 루트(꼭대기)</strong>입니다.</p>
                </div>
                <div class="bg-[#F7F7F9] p-8 rounded-xl border border-gray-300">
                    <strong class="block mb-4 text-black text-4xl">2. 목표 (LCA)</strong>
                    <p>두 노드 A, B가 주어졌을 때, 위쪽으로 올라가면서 만나는 조상 중 <strong>가장 가까운(깊은)</strong> 녀석을 찾아야 합니다.</p>
                </div>
            </div>
            <div class="mt-12 p-8 bg-white border-l-8 border-red-500 shadow-md">
                <p class="text-3xl font-bold text-red-600 mb-4">⚠️ 제약 조건의 압박</p>
                <p class="text-3xl text-gray-800">
                    정점(N) 10만 개, 질문(M) 10만 번.<br>
                    단순하게 찾으면 100억 번 연산 ➡️ <strong>시간 초과 확정!</strong>
                </p>
            </div>
        `
    },

    // --- [심화 분석] 2. 시뮬레이션 (실패) ---
    {
        type: 'explanation_slide',
        title: '심화 분석 2: 왜 실패하는가?',
        content: `
            <h3 class="text-4xl font-bold text-red-600 mb-8">❌ 기존 방법: 한 칸씩 올라가기</h3>
            <div class="text-3xl text-gray-800 leading-loose">
                <p class="mb-8">
                    가장 단순한 방법은 두 노드의 깊이를 맞추고, <br>
                    같아질 때까지 <strong>한 칸씩 부모로 이동</strong>하는 것입니다.
                </p>
                <div class="bg-gray-100 p-8 rounded-xl border border-gray-300 font-mono">
                    while (parent[A] != parent[B]) {<br>
                    &nbsp;&nbsp;A = parent[A]; // 한 칸 위로<br>
                    &nbsp;&nbsp;B = parent[B]; // 한 칸 위로<br>
                    }
                </div>
                <p class="mt-8 text-red-600 font-bold">
                    트리가 일직선이라면? 깊이가 10만이면?<br>
                    10만(깊이) × 10만(질문) = 100억 번 연산 (100초 소요) 🐢
                </p>
            </div>
        `
    },

    // --- [심화 분석] 3. 해결책 ---
    {
        type: 'explanation_slide',
        title: '심화 분석 3: 해결책 (희소 배열)',
        content: `
            <h3 class="text-4xl font-bold text-[#0076C0] mb-8">💡 아이디어: 2의 제곱수로 점프!</h3>
            <div class="text-3xl text-gray-800 leading-relaxed">
                <p class="mb-8">
                    한 칸씩 가지 말고, <strong>축지법(점프)</strong>을 씁니다.<br>
                    모든 노드에게 미리 <strong>2^k 번째 조상</strong>을 외우게 시킵니다.
                </p>
                <ul class="list-disc pl-12 space-y-4 bg-[#F0F8FF] p-8 rounded-xl border border-[#0076C0]">
                    <li>나의 <strong>1번째</strong> ($2^0$) 조상 (부모)</li>
                    <li>나의 <strong>2번째</strong> ($2^1$) 조상 (부모의 부모)</li>
                    <li>나의 <strong>4번째</strong> ($2^2$) 조상</li>
                    <li>... 나의 <strong>65536번째</strong> ($2^{16}$) 조상</li>
                </ul>
                <p class="mt-8">
                    이렇게 하면 아무리 깊어도 <strong>최대 17번</strong> 점프만으로 도달 가능합니다! 🚀
                </p>
            </div>
        `
    },

    // --- [심화 분석] 4. 과정 및 요약 ---
    {
        type: 'explanation_slide',
        title: '심화 분석 4: 코드 구현 요약',
        content: `
            <h3 class="text-4xl font-bold text-[#0076C0] mb-8">💻 핵심 로직 요약</h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full">
                <div class="text-3xl text-gray-800 space-y-6">
                    <div class="p-6 border-l-8 border-green-500 bg-green-50">
                        <strong>1. 족보 만들기 (전처리)</strong><br>
                        <span class="text-2xl text-gray-600">"내 8번째 조상은 = 내 4번째 조상의 4번째 조상이다"</span>
                    </div>
                    <div class="p-6 border-l-8 border-blue-500 bg-blue-50">
                        <strong>2. 깊이 맞추기</strong><br>
                        <span class="text-2xl text-gray-600">큰 보폭부터 점프하여 두 노드의 높이를 맞춘다.</span>
                    </div>
                    <div class="p-6 border-l-8 border-purple-500 bg-purple-50">
                        <strong>3. 같이 점프하기</strong><br>
                        <span class="text-2xl text-gray-600">만나기 <strong>직전</strong>까지 같이 점프한 뒤, 한 칸 위가 정답!</span>
                    </div>
                </div>
                <div class="bg-[#282c34] p-6 rounded-xl border border-gray-500 overflow-hidden flex flex-col justify-center">
                    <pre><code class="language-java text-2xl text-white font-mono">
// 2^k번째 조상 채우기 (점화식)
for (int k = 1; k <= K_MAX; k++) {
    for (int n = 1; n <= N; n++) {
        parent[k][n] = 
          parent[k-1][ parent[k-1][n] ];
    }
}</code></pre>
                </div>
            </div>
        `
    },

    {
        type: 'problem',
        title: '알고리즘: 희소 배열 LCA (O(log N))',
        codes: {
            java: `import java.io.*;
import java.util.*;

public class bj3_11438 {
    static ArrayList<Integer>[] adj;
    static int[][] parent;
    static int[] depth;
    static int k_max;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());

        k_max = 0;
        for (int i = 1; i <= n; i *= 2) k_max++;

        adj = new ArrayList[n + 1];
        parent = new int[k_max + 1][n + 1];
        depth = new int[n + 1];

        for (int i = 1; i <= n; i++) adj[i] = new ArrayList<>();

        StringTokenizer st;
        for (int i = 0; i < n - 1; i++) {
            st = new StringTokenizer(br.readLine());
            int a = Integer.parseInt(st.nextToken());
            int b = Integer.parseInt(st.nextToken());
            adj[a].add(b);
            adj[b].add(a);
        }

        dfs(1, 1);
        fillParents(n);

        int m = Integer.parseInt(br.readLine());
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < m; i++) {
            st = new StringTokenizer(br.readLine());
            int a = Integer.parseInt(st.nextToken());
            int b = Integer.parseInt(st.nextToken());
            sb.append(lca(a, b)).append("\\n");
        }
        System.out.print(sb);
    }

    static void dfs(int node, int cnt) {
        depth[node] = cnt;
        for (int next : adj[node]) {
            if (depth[next] == 0) {
                dfs(next, cnt + 1);
                parent[0][next] = node;
            }
        }
    }

    static void fillParents(int n) {
        for (int i = 1; i <= k_max; i++) {
            for (int j = 1; j <= n; j++) {
                parent[i][j] = parent[i - 1][parent[i - 1][j]];
            }
        }
    }

    static int lca(int a, int b) {
        if (depth[a] < depth[b]) { int temp = a; a = b; b = temp; }

        for (int i = k_max; i >= 0; i--) {
            if (Math.pow(2, i) <= depth[a] - depth[b]) {
                a = parent[i][a];
            }
        }
        if (a == b) return a;

        for (int i = k_max; i >= 0; i--) {
            if (parent[i][a] != parent[i][b]) {
                a = parent[i][a];
                b = parent[i][b];
            }
        }
        return parent[0][a];
    }
}`,
            python: `import sys
sys.setrecursionlimit(10**6)
input = sys.stdin.readline

n = int(input())
k_max = 0
temp = 1
while temp <= n:
    temp *= 2
    k_max += 1

adj = [[] for _ in range(n + 1)]
parent = [[0] * (n + 1) for _ in range(k_max + 1)]
depth = [0] * (n + 1)
visited = [False] * (n + 1)

for _ in range(n - 1):
    a, b = map(int, input().split())
    adj[a].append(b)
    adj[b].append(a)

def dfs(node, d):
    visited[node] = True
    depth[node] = d
    for next_node in adj[node]:
        if not visited[next_node]:
            parent[0][next_node] = node
            dfs(next_node, d + 1)

dfs(1, 0)

for i in range(1, k_max + 1):
    for j in range(1, n + 1):
        parent[i][j] = parent[i - 1][parent[i - 1][j]]

def lca(a, b):
    if depth[a] < depth[b]: a, b = b, a
    for i in range(k_max, -1, -1):
        if (1 << i) <= depth[a] - depth[b]:
            a = parent[i][a]
    if a == b: return a
    for i in range(k_max, -1, -1):
        if parent[i][a] != parent[i][b]:
            a = parent[i][a]
            b = parent[i][b]
    return parent[0][a]

m = int(input())
for _ in range(m):
    a, b = map(int, input().split())
    print(lca(a, b))`,
            javascript: `const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\\n');
let lineIdx = 0;
const N = Number(input[lineIdx++]);

let K = 0;
let temp = 1;
while (temp <= N) { temp *= 2; K++; }

const adj = Array.from({ length: N + 1 }, () => []);
const parent = Array.from({ length: K + 1 }, () => new Int32Array(N + 1));
const depth = new Int32Array(N + 1);
const visited = new Uint8Array(N + 1);

for (let i = 0; i < N - 1; i++) {
    const [a, b] = input[lineIdx++].split(' ').map(Number);
    adj[a].push(b); adj[b].push(a);
}

const stack = [[1, 0]];
visited[1] = 1;
while (stack.length) {
    const [node, d] = stack.pop();
    depth[node] = d;
    for (const next of adj[node]) {
        if (!visited[next]) {
            visited[next] = 1;
            parent[0][next] = node;
            stack.push([next, d + 1]);
        }
    }
}

for (let i = 1; i <= K; i++) {
    for (let j = 1; j <= N; j++) {
        parent[i][j] = parent[i - 1][parent[i - 1][j]];
    }
}

const M = Number(input[lineIdx++]);
const output = [];

function lca(a, b) {
    if (depth[a] < depth[b]) [a, b] = [b, a];
    for (let i = K; i >= 0; i--) {
        if (Math.pow(2, i) <= depth[a] - depth[b]) {
            a = parent[i][a];
        }
    }
    if (a === b) return a;
    for (let i = K; i >= 0; i--) {
        if (parent[i][a] !== parent[i][b]) {
            a = parent[i][a];
            b = parent[i][b];
        }
    }
    return parent[0][a];
}

for (let i = 0; i < M; i++) {
    const [a, b] = input[lineIdx++].split(' ').map(Number);
    output.push(lca(a, b));
}
console.log(output.join('\\n'));`
        }
    }
];