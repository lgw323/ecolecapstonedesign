import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.StringTokenizer;

/**
 * 백준 11657: 타임머신
 * - 문제 유형: 최단 경로 (음수 가중치 포함)
 * - 알고리즘: 벨만-포드 (Bellman-Ford)
 *
 * [핵심 아이디어]
 * 1. 다익스트라는 음수 가중치 간선을 처리할 수 없습니다.
 * 2. 벨만-포드 알고리즘은 O(VE)의 시간 복잡도로 음수 가중치 그래프의 최단 경로를 찾습니다.
 * 3. 벨만-포드는 '모든 간선'을 'N-1'번 반복하여 확인하며 최단 거리를 갱신합니다.
 * 4. 만약 N번째 반복에서도 최단 거리가 갱신된다면, 이는 '음수 사이클'이 존재한다는 의미입니다.
 */
public class bj1_11657 {

    static class Edge {
        int start, end, time;

        public Edge(int start, int end, int time) {
            this.start = start;
            this.end = end;
            this.time = time;
        }
    }

    static final long INF = Long.MAX_VALUE;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        int N = Integer.parseInt(st.nextToken()); // 도시의 개수 (노드)
        int M = Integer.parseInt(st.nextToken()); // 버스 노선 개수 (간선)

        ArrayList<Edge> edges = new ArrayList<>();
        long[] dist = new long[N + 1];

        // 1. 간선 리스트 생성 및 거리 배열 초기화
        for (int i = 0; i < M; i++) {
            st = new StringTokenizer(br.readLine());
            int A = Integer.parseInt(st.nextToken());
            int B = Integer.parseInt(st.nextToken());
            int C = Integer.parseInt(st.nextToken());
            edges.add(new Edge(A, B, C));
        }

        Arrays.fill(dist, INF);
        dist[1] = 0; // 시작 노드(1번 도시)의 거리는 0

        // 2. 벨만-포드 알고리즘 수행 (N-1번 반복)
        for (int i = 1; i < N; i++) {
            for (int j = 0; j < M; j++) {
                Edge edge = edges.get(j);

                // 현재 간선을 거쳐서 가는 거리가 더 짧은 경우 갱신
                if (dist[edge.start] != INF && dist[edge.end] > dist[edge.start] + edge.time) {
                    dist[edge.end] = dist[edge.start] + edge.time;
                }
            }
        }

        // 3. 음수 사이클 확인 (N번째 반복)
        boolean hasNegativeCycle = false;
        for (int j = 0; j < M; j++) {
            Edge edge = edges.get(j);

            // N번째에도 갱신이 발생하면 음수 사이클 존재
            if (dist[edge.start] != INF && dist[edge.end] > dist[edge.start] + edge.time) {
                hasNegativeCycle = true;
                break;
            }
        }

        StringBuilder sb = new StringBuilder();
        if (hasNegativeCycle) {
            sb.append("-1\n");
        } else {
            // 4. 결과 출력
            for (int i = 2; i <= N; i++) {
                if (dist[i] == INF) {
                    sb.append("-1\n");
                } else {
                    sb.append(dist[i]).append("\n");
                }
            }
        }

        System.out.print(sb);
    }
}