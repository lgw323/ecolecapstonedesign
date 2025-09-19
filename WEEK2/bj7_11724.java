import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.StringTokenizer;

public class bj6_11724 {

    static ArrayList<Integer>[] adjList;
    static boolean[] visited;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        int n = Integer.parseInt(st.nextToken());
        int m = Integer.parseInt(st.nextToken());

        adjList = new ArrayList[n + 1];
        visited = new boolean[n + 1];
        for (int i = 1; i <= n; i++) {
            adjList[i] = new ArrayList<>();
        }

        for (int i = 0; i < m; i++) {
            st = new StringTokenizer(br.readLine());
            int u = Integer.parseInt(st.nextToken());
            int v = Integer.parseInt(st.nextToken());
            adjList[u].add(v);
            adjList[v].add(u);
        }

        int componentCount = 0;
        for (int i = 1; i <= n; i++) {
            if (!visited[i]) {
                componentCount++;
                dfs(i);
            }
        }

        System.out.println(componentCount);
    }

    private static void dfs(int node) {
        visited[node] = true;

        for (int neighbor : adjList[node]) {
            if (!visited[neighbor]) {
                dfs(neighbor);
            }
        }
    }
}
