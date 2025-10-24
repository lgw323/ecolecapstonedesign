import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.PriorityQueue;
import java.util.StringTokenizer;

public class bj7_1854 {

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

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        int m = Integer.parseInt(st.nextToken());
        int k = Integer.parseInt(st.nextToken());

        ArrayList<Node>[] adjList = new ArrayList[n + 1];
        PriorityQueue<Integer>[] distPQs = new PriorityQueue[n + 1];

        for (int i = 1; i <= n; i++) {
            adjList[i] = new ArrayList<>();
            distPQs[i] = new PriorityQueue<>(Collections.reverseOrder());
        }

        for (int i = 0; i < m; i++) {
            st = new StringTokenizer(br.readLine());
            int a = Integer.parseInt(st.nextToken());
            int b = Integer.parseInt(st.nextToken());
            int c = Integer.parseInt(st.nextToken());
            adjList[a].add(new Node(b, c));
        }

        PriorityQueue<Node> pq = new PriorityQueue<>();
        pq.add(new Node(1, 0));
        distPQs[1].add(0);

        while (!pq.isEmpty()) {
            Node current = pq.poll();

            for (Node next : adjList[current.node]) {
                int newDist = current.weight + next.weight;

                if (distPQs[next.node].size() < k) {
                    distPQs[next.node].add(newDist);
                    pq.add(new Node(next.node, newDist));
                } else if (newDist < distPQs[next.node].peek()) {
                    distPQs[next.node].poll();
                    distPQs[next.node].add(newDist);
                    pq.add(new Node(next.node, newDist));
                }
            }
        }

        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= n; i++) {
            if (distPQs[i].size() < k) {
                sb.append("-1\n");
            } else {
                sb.append(distPQs[i].peek()).append("\n");
            }
        }
        System.out.print(sb);
    }
}
