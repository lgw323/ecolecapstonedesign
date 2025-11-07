import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

/**
 * 백준 11404: 플로이드
 * - 문제 유형: 모든 쌍 최단 경로 (All-Pairs Shortest Path)
 * - 알고리즘: 플로이드-워셜 (Floyd-Warshall)
 *
 * [핵심 아이디어]
 * 1. O(N^3) 시간 복잡도를 가짐. N이 100으로 작기 때문에 사용 가능.
 * 2. `dist[i][j]` : i에서 j로 가는 최단 경로
 * 3. 핵심 점화식: `dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])`
 * (i에서 j로 바로 가는 비용 vs i에서 k를 거쳐 j로 가는 비용)
 * 4. 모든 노드 k를 '거쳐 가는 노드'로 순서대로 사용합니다.
 */
public class bj2_11404 {

    static final int INF = 100_000_001; // (최대 비용 100,000 * N 100) 보다 큰 값

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;

        int n = Integer.parseInt(br.readLine()); // 도시 개수 (노드)
        int m = Integer.parseInt(br.readLine()); // 버스 개수 (간선)

        int[][] dist = new int[n + 1][n + 1];

        // 1. 거리 배열 초기화
        for (int i = 1; i <= n; i++) {
            Arrays.fill(dist[i], INF);
            dist[i][i] = 0; // 자기 자신으로 가는 비용은 0
        }

        // 2. 간선 정보 입력
        for (int i = 0; i < m; i++) {
            st = new StringTokenizer(br.readLine());
            int a = Integer.parseInt(st.nextToken());
            int b = Integer.parseInt(st.nextToken());
            int c = Integer.parseInt(st.nextToken());
            // 시작 도시와 도착 도시를 연결하는 노선은 하나가 아닐 수 있음
            dist[a][b] = Math.min(dist[a][b], c);
        }

        // 3. 플로이드-워셜 알고리즘 수행
        for (int k = 1; k <= n; k++) { // k: 거쳐가는 노드
            for (int i = 1; i <= n; i++) { // i: 출발 노드
                for (int j = 1; j <= n; j++) { // j: 도착 노드
                    // i -> j vs i -> k -> j
                    dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }

        // 4. 결과 출력
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (dist[i][j] == INF) {
                    sb.append("0 ");
                } else {
                    sb.append(dist[i][j]).append(" ");
                }
            }
            sb.append("\n");
        }
        System.out.print(sb);
    }
}