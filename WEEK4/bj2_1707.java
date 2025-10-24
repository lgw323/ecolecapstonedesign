import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

public class bj2_1707 {

    static ArrayList<Integer>[] adjList;
    static int[] groups;
    static final int GROUP_A = 1;
    static final int GROUP_B = 2;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int k = Integer.parseInt(br.readLine());
        StringBuilder sb = new StringBuilder();

        for (int t = 0; t < k; t++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            int v = Integer.parseInt(st.nextToken());
            int e = Integer.parseInt(st.nextToken());

            adjList = new ArrayList[v + 1];
            groups = new int[v + 1];
            for (int i = 1; i <= v; i++) {
                adjList[i] = new ArrayList<>();
            }

            for (int i = 0; i < e; i++) {
                st = new StringTokenizer(br.readLine());
                int u = Integer.parseInt(st.nextToken());
                int w = Integer.parseInt(st.nextToken());
                adjList[u].add(w);
                adjList[w].add(u);
            }

            boolean isBipartite = true;
            for (int i = 1; i <= v; i++) {
                if (groups[i] == 0) {
                    if (!isBipartite(i)) {
                        isBipartite = false;
                        break;
                    }
                }
            }
            sb.append(isBipartite ? "YES" : "NO").append("\n");
        }
        System.out.print(sb);
    }

    private static boolean isBipartite(int startNode) {
        Queue<Integer> queue = new LinkedList<>();
        queue.add(startNode);
        groups[startNode] = GROUP_A;

        while (!queue.isEmpty()) {
            int current = queue.poll();
            int nextGroup = (groups[current] == GROUP_A) ? GROUP_B : GROUP_A;

            for (int neighbor : adjList[current]) {
                if (groups[neighbor] == 0) {
                    groups[neighbor] = nextGroup;
                    queue.add(neighbor);
                } else if (groups[neighbor] == groups[current]) {
                    return false;
                }
            }
        }
        return true;
    }
}
