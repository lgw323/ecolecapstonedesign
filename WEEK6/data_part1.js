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

    // --- [심화 분석] 1. 용어 정리 (그림) ---
    {
        type: 'explanation_slide',
        title: '심화 분석 1: 문제 속 용어, 그림으로 이해하기',
        content: `
            <div class="flex flex-col h-full justify-center">
                <h3 class="text-4xl font-bold text-gray-800 mb-8">🌲 트리의 가족 관계도</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div class="bg-gray-900 text-white p-8 rounded-xl font-mono text-3xl leading-relaxed shadow-lg">
<pre>
      1 (루트: 왕)
     / \\
    2   3
   / \\
  4   5
</pre>
                    </div>
                    <div class="space-y-6 text-3xl text-gray-700">
                        <p><strong class="text-[#0076C0]">정점 (Node):</strong> 번호가 붙은 동그라미 (1~5)</p>
                        <p><strong class="text-[#0076C0]">부모 (Parent):</strong> 나랑 연결된 <strong>바로 위</strong> 노드<br>(4의 부모는 2)</p>
                        <p><strong class="text-[#0076C0]">조상 (Ancestor):</strong> 내 머리 위에 있는 <strong>모든</strong> 노드<br>(4의 조상은 2, 1)</p>
                    </div>
                </div>
            </div>
        `
    },

    // --- [심화 분석] 2. 목표 시뮬레이션 ---
    {
        type: 'explanation_slide',
        title: '심화 분석 2: 무엇을 구해야 하는가?',
        content: `
            <div class="flex flex-col h-full">
                <h3 class="text-4xl font-bold text-gray-800 mb-8">🎯 목표: 공통 조상 중 '가장 가까운' 분 찾기</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
                    <div class="bg-gray-100 p-8 rounded-xl border-l-8 border-[#0076C0] text-3xl leading-relaxed">
                        <p class="mb-6"><strong>질문:</strong> "4번과 5번의 공통 조상은?"</p>
                        <ul class="list-disc list-inside space-y-4">
                            <li>4번의 조상: <strong>2</strong>, <strong>1</strong></li>
                            <li>5번의 조상: <strong>2</strong>, <strong>1</strong></li>
                            <li>공통 조상: 2, 1</li>
                        </ul>
                        <p class="mt-8 text-[#0076C0] font-bold">
                            가장 가까운(깊은) 정답(LCA): <span class="text-5xl text-red-600 align-middle">2</span>
                        </p>
                    </div>
                    <div class="bg-white p-8 rounded-xl shadow-xl flex justify-center items-center">
                        <div class="font-mono text-4xl leading-loose">
<pre>
      1
     / \\
    <span class="text-red-600 font-bold">2</span>   3
   <span class="text-blue-500">/</span> <span class="text-blue-500">\\</span>
  <span class="text-blue-600 font-bold">4</span>   <span class="text-blue-600 font-bold">5</span>
</pre>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    // --- [심화 분석] 3. 난이도 (시간 초과) ---
    {
        type: 'explanation_slide',
        title: '심화 분석 3: 그냥 찾으면 안 되나요? (시간 초과)',
        content: `
            <div class="flex flex-col h-full justify-center">
                <h3 class="text-4xl font-bold text-red-600 mb-8">🐢 왜 어려운가? (시간 초과 경고)</h3>
                <div class="bg-red-50 border-4 border-red-200 rounded-2xl p-10 space-y-8">
                    <div class="flex items-start gap-8">
                        <div class="text-6xl">😱</div>
                        <div>
                            <h4 class="text-4xl font-bold text-gray-800 mb-4">최악의 시나리오: 일직선 트리</h4>
                            <p class="text-3xl text-gray-700 font-mono bg-white inline-block px-4 py-2 rounded">1 - 2 - 3 - ... - 100,000</p>
                        </div>
                    </div>
                    
                    <hr class="border-red-200">

                    <div class="space-y-6 text-3xl text-gray-800">
                        <p><strong>상황:</strong> 지하 10만 층(N)에서 꼭대기 1층까지 걸어서 가야 함.</p>
                        <p><strong>미션:</strong> 이 짓을 10만 번(M) 반복해야 함.</p>
                        <p class="bg-white p-6 rounded-xl shadow-inner">
                            <span class="font-bold text-red-600">100,000 (깊이) × 100,000 (질문) = 100억 번 연산</span><br>
                            <span class="text-2xl text-gray-500 mt-2">컴퓨터 처리 속도: 1초에 약 1억 번 ➡️ <strong>100초 소요 (시간 초과!)</strong></span>
                        </p>
                    </div>
                </div>
            </div>
        `
    },

    // --- [심화 분석] 4. 해결책 (희소 배열) ---
    {
        type: 'explanation_slide',
        title: '심화 분석 4: 해결책 - 2의 제곱수로 점프! (희소 배열)',
        content: `
            <div class="flex flex-col h-full justify-center">
                <h3 class="text-4xl font-bold text-[#0076C0] mb-8">⚡ 해결책: 2의 제곱수로 점프! (희소 배열)</h3>
                
                <div class="grid grid-cols-2 gap-12">
                    <div class="space-y-8">
                        <div class="bg-blue-50 p-8 rounded-xl border-l-8 border-blue-500">
                            <h4 class="text-3xl font-bold mb-4">🚀 아이디어: 축지법</h4>
                            <p class="text-3xl leading-relaxed">
                                한 칸씩 기어가지 말고,<br>
                                <strong>2의 k승 칸씩 껑충</strong> 뛰어서 가자!
                            </p>
                        </div>
                        <div class="text-3xl text-gray-700 space-y-4">
                            <p>✔️ 2^0 = 1번째 조상 (부모)</p>
                            <p>✔️ 2^1 = 2번째 조상</p>
                            <p>✔️ 2^2 = 4번째 조상</p>
                            <p>✔️ 2^16 ≈ 65,536번째 조상</p>
                        </div>
                    </div>

                    <div class="bg-gray-800 text-green-400 p-8 rounded-xl font-mono text-2xl flex flex-col justify-center items-center shadow-2xl">
                        <p class="mb-6 text-white">10만 층을 올라가는 횟수 비교</p>
                        <div class="w-full space-y-4">
                            <div class="flex justify-between border-b border-gray-600 pb-2">
                                <span>기존 방식</span>
                                <span class="text-red-400">100,000번</span>
                            </div>
                            <div class="flex justify-between text-3xl font-bold">
                                <span>점프 방식</span>
                                <span class="text-yellow-400">단 17번!</span>
                            </div>
                        </div>
                        <p class="mt-6 text-gray-400 text-xl">(2^17 > 100,000)</p>
                    </div>
                </div>
            </div>
        `
    },

    // --- [심화 분석] 5. 동작 과정 ---
    {
        type: 'explanation_slide',
        title: '심화 분석 5: 알고리즘 동작 과정',
        content: `
            <div class="flex flex-col h-full">
                <h3 class="text-4xl font-bold text-gray-800 mb-8">👣 실전 풀이 과정 (알고리즘 동작)</h3>
                <div class="grid grid-cols-3 gap-6 h-full text-center">
                    
                    <!-- Step 1 -->
                    <div class="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg flex flex-col">
                        <div class="bg-[#0076C0] text-white text-2xl font-bold py-2 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">1</div>
                        <h4 class="text-2xl font-bold mb-4">깊이(Depth) 맞추기</h4>
                        <div class="flex-1 bg-gray-50 rounded-lg p-4 flex items-center justify-center text-6xl">
                            📏
                        </div>
                        <p class="text-xl text-gray-600 mt-4 text-left">
                            더 깊이 있는 녀석을 끄집어 올려서 <strong>같은 층</strong>에 세웁니다.<br>
                            (큰 점프부터 시도)
                        </p>
                    </div>

                    <!-- Step 2 -->
                    <div class="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg flex flex-col">
                        <div class="bg-[#0076C0] text-white text-2xl font-bold py-2 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">2</div>
                        <h4 class="text-2xl font-bold mb-4">같이 점프하기</h4>
                        <div class="flex-1 bg-gray-50 rounded-lg p-4 flex items-center justify-center text-6xl">
                            🏃💨 🏃💨
                        </div>
                        <p class="text-xl text-gray-600 mt-4 text-left">
                            두 노드가 <strong>다를 때만</strong> 위로 점프합니다.<br>
                            (만나기 <strong>직전</strong>까지 이동)
                        </p>
                    </div>

                    <!-- Step 3 -->
                    <div class="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg flex flex-col">
                        <div class="bg-[#0076C0] text-white text-2xl font-bold py-2 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">3</div>
                        <h4 class="text-2xl font-bold mb-4">정답 찾기</h4>
                        <div class="flex-1 bg-gray-50 rounded-lg p-4 flex items-center justify-center text-6xl">
                            🏁
                        </div>
                        <p class="text-xl text-gray-600 mt-4 text-left">
                            도착한 곳의 <strong>바로 위 부모</strong>가 진짜 공통 조상(LCA)입니다.
                        </p>
                    </div>

                </div>
            </div>
        `
    },

    // --- [심화 분석] 6. 코드 연결 ---
    {
        type: 'explanation_slide',
        title: '심화 분석 6: 코드로 구현하기 (3단계)',
        content: `
            <div class="flex flex-col h-full justify-center">
                <h3 class="text-4xl font-bold text-[#0076C0] mb-8">💻 코드 구현 3단계 (요약)</h3>
                
                <div class="space-y-6 text-2xl">
                    
                    <div class="flex items-center bg-gray-50 p-6 rounded-xl border-l-8 border-green-500 shadow-sm">
                        <div class="font-bold w-32 text-green-700">STEP 1</div>
                        <div class="flex-1">
                            <strong>DFS 탐색:</strong><br>
                            누가 몇 층에 사는지, 1번째 부모는 누구인지 조사합니다.
                            <code class="block mt-2 text-gray-500 text-xl font-mono">depth[node] = d; parent[0][node] = p;</code>
                        </div>
                    </div>

                    <div class="flex items-center bg-gray-50 p-6 rounded-xl border-l-8 border-blue-500 shadow-sm">
                        <div class="font-bold w-32 text-blue-700">STEP 2</div>
                        <div class="flex-1">
                            <strong>족보 만들기 (DP):</strong> <span class="text-red-500 text-sm font-bold align-top">★핵심</span><br>
                            점화식을 이용해 2의 k승번째 조상을 모두 채웁니다.
                            <code class="block mt-2 text-blue-600 text-xl font-mono bg-blue-100 p-2 rounded">parent[k][n] = parent[k-1][ parent[k-1][n] ];</code>
                            <span class="text-gray-500 text-lg">(내 8번째 위 = 내 4번째 위의 4번째 위)</span>
                        </div>
                    </div>

                    <div class="flex items-center bg-gray-50 p-6 rounded-xl border-l-8 border-purple-500 shadow-sm">
                        <div class="font-bold w-32 text-purple-700">STEP 3</div>
                        <div class="flex-1">
                            <strong>LCA Query:</strong><br>
                            입력이 들어오면 <strong>깊이를 맞추고</strong> &rarr; <strong>점프</strong>해서 정답을 출력!
                        </div>
                    </div>

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