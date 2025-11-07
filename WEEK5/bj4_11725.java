import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.StringTokenizer;

public class bj4_11725 {
    static int N;
    static boolean[] visited; // Boolean -> boolean (NullPointerException 방지)
    static int[] answer;
    static ArrayList<Integer>[] tree;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        N = Integer.parseInt(br.readLine());

        // 1. 자료구조 초기화
        visited = new boolean[N + 1]; // 기본값 false로 자동 초기화됨
        tree = new ArrayList[N + 1];
        answer = new int[N + 1];

        // 2. (수정) 인접 리스트 배열의 각 리스트 초기화
        for (int i = 1; i <= N; i++) { // 0이 아닌 1부터 N까지
            tree[i] = new ArrayList<>();
        }

        // 3. (수정) N-1개의 간선 정보를 루프 안에서 입력받음
        for (int i = 1; i < N; i++) { // 1부터 N-1까지 (N-1번)
            StringTokenizer st = new StringTokenizer(br.readLine()); // 루프 안에서 매번 새 줄 읽기
            int n1 = Integer.parseInt(st.nextToken());
            int n2 = Integer.parseInt(st.nextToken());
            // 양방향 그래프로 트리를 표현
            tree[n1].add(n2);
            tree[n2].add(n1);
        }

        // 루트 노드(1)부터 DFS 시작
        DFS(1);

        // 2번 노드부터 부모 출력
        for (int i = 2; i <= N; i++) {
            System.out.println(answer[i]);
        }
    }

    /**
     * DFS를 통해 부모 노드를 찾는 함수
     * 
     * @param number 현재 방문 중인 노드 (부모 노드가 됨)
     */
    static void DFS(int number) {
        visited[number] = true;
        for (int child : tree[number]) {
            if (!visited[child]) {
                answer[child] = number; // child의 부모는 number
                DFS(child); // 자식 노드로 재귀 호출
            }
        }
    }
}