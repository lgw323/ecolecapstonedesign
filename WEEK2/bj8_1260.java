import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

public class bj8_1260 {

    static ArrayList<Integer>[] adjList;
    static boolean[] visited;
    static StringBuilder sb = new StringBuilder();

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        int n = Integer.parseInt(st.nextToken());
        int m = Integer.parseInt(st.nextToken());
        int v = Integer.parseInt(st.nextToken());

        adjList = new ArrayList[n + 1];
        for (int i = 1; i <= n; i++) {
            adjList[i] = new ArrayList<>();
        }

        for (int i = 0; i < m; i++) {
            st = new StringTokenizer(br.readLine());
            int u = Integer.parseInt(st.nextToken());
            int w = Integer.parseInt(st.nextToken());
            adjList[u].add(w);
            adjList[w].add(u);
        }

        for (int i = 1; i <= n; i++) {
            Collections.sort(adjList[i]);
        }

        visited = new boolean[n + 1];
        dfs(v);
        sb.append("\n");

        visited = new boolean[n + 1];
        bfs(v);

        System.out.println(sb.toString());
    }

    private static void dfs(int node) {
        visited[node] = true;
        sb.append(node).append(" ");

        for (int neighbor : adjList[node]) {
            if (!visited[neighbor]) {
                dfs(neighbor);
            }
        }
    }

    private static void bfs(int startNode) {
        Queue<Integer> queue = new LinkedList<>();

        queue.add(startNode);
        visited[startNode] = true;

        while (!queue.isEmpty()) {
            int node = queue.poll();
            sb.append(node).append(" ");

            for (int neighbor : adjList[node]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.add(neighbor);
                }
            }
        }
    }
}
