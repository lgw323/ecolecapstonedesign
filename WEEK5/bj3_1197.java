import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.PriorityQueue;
import java.util.StringTokenizer;

/**
 * 백준 1197: 최소 스패닝 트리
 * - 문제 유형: 최소 스패닝 트리 (MST)
 * - 알고리즘: 크루스칼 (Kruskal)
 *
 * [핵심 아이디어]
 * 1. 모든 간선을 가중치 기준으로 오름차순 정렬합니다.
 * 2. 가중치가 가장 낮은 간선부터 순서대로 확인합니다.
 * 3. 해당 간선이 연결하는 두 정점이 '이미 같은 집합(연결되어 있는지)'인지 확인합니다. (Union-Find 사용)
 * 4. 만약 같은 집합이 아니라면 (사이클을 형성하지 않는다면), 해당 간선을 MST에 포함시키고 두 집합을 합칩니다.
 * 5. N-1개의 간선이 선택될 때까지 반복합니다.
 */
public class bj3_1197 {

    // 간선 정보 (가중치 기준 정렬을 위해 Comparable 구현)
    static class Edge implements Comparable<Edge> {
        int start, end, weight;

        public Edge(int start, int end, int weight) {
            this.start = start;
            this.end = end;
            this.weight = weight;
        }

        @Override
        public int compareTo(Edge o) {
            return this.weight - o.weight; // 가중치 오름차순
        }
    }

    static int[] parent; // Union-Find를 위한 부모 노드 배열

    // Union-Find: find 연산 (경로 압축 적용)
    static int find(int x) {
        if (parent[x] == x) {
            return x;
        }
        return parent[x] = find(parent[x]);
    }

    // Union-Find: union 연산
    static void union(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        if (rootX != rootY) {
            parent[rootY] = rootX; // rootY를 rootX의 자식으로 붙임
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        int V = Integer.parseInt(st.nextToken()); // 정점 개수
        int E = Integer.parseInt(st.nextToken()); // 간선 개수

        // 우선순위 큐를 사용하면 간선을 넣을 때 자동 정렬됨 (간선 정렬)
        PriorityQueue<Edge> pq = new PriorityQueue<>();
        for (int i = 0; i < E; i++) {
            st = new StringTokenizer(br.readLine());
            int A = Integer.parseInt(st.nextToken());
            int B = Integer.parseInt(st.nextToken());
            int C = Integer.parseInt(st.nextToken());
            pq.add(new Edge(A, B, C));
        }

        // Union-Find 부모 배열 초기화
        parent = new int[V + 1];
        for (int i = 1; i <= V; i++) {
            parent[i] = i;
        }

        long totalWeight = 0; // 최소 가중치 합 (범위 초과 가능성 있으므로 long)
        int edgeCount = 0; // 선택된 간선 개수

        // 크루스칼 알고리즘 수행
        while (!pq.isEmpty()) {
            Edge edge = pq.poll();

            // 두 노드의 루트가 다르면 (사이클이 생기지 않으면) 간선 선택
            if (find(edge.start) != find(edge.end)) {
                union(edge.start, edge.end);
                totalWeight += edge.weight;
                edgeCount++;
            }

            // 간선을 V-1개 선택했다면 MST 완성
            if (edgeCount == V - 1) {
                break;
            }
        }

        System.out.println(totalWeight);
    }
}