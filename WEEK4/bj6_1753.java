import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.PriorityQueue;
import java.util.StringTokenizer;

public class bj6_1753 {

    static class Node implements Comparable<Node> {
        int node;
        int weight;

        Node(int node, int weight) {
            this.node = node;
            this.weight = weight;
        }

        @Override
        public int compareTo(Node o) {
            return this.weight - o.weight;
        }
    }

    static final int INF = Integer.MAX_VALUE;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int v = Integer.parseInt(st.nextToken());
        int e = Integer.parseInt(st.nextToken());
        int k = Integer.parseInt(br.readLine());

        ArrayList<Node>[] adjList = new ArrayList[v + 1];
        int[] dist = new int[v + 1];

        for (int i = 1; i <= v; i++) {
            adjList[i] = new ArrayList<>();
            dist[i] = INF;
        }

        for (int i = 0; i < e; i++) {
            st = new StringTokenizer(br.readLine());
            int u = Integer.parseInt(st.nextToken());
            int w = Integer.parseInt(st.nextToken());
            int weight = Integer.parseInt(st.nextToken());
            adjList[u].add(new Node(w, weight));
        }

        PriorityQueue<Node> pq = new PriorityQueue<>();
        dist[k] = 0;
        pq.add(new Node(k, 0));

        while (!pq.isEmpty()) {
            Node current = pq.poll();

            if (current.weight > dist[current.node]) {
                continue;
            }

            for (Node next : adjList[current.node]) {
                if (dist[next.node] > dist[current.node] + next.weight) {
                    dist[next.node] = dist[current.node] + next.weight;
                    pq.add(new Node(next.node, dist[next.node]));
                }
            }
        }

        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= v; i++) {
            if (dist[i] == INF) {
                sb.append("INF\n");
            } else {
                sb.append(dist[i]).append("\n");
            }
        }
        System.out.print(sb);
    }
}
