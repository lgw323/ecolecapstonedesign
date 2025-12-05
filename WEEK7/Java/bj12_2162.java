import java.io.*;
import java.util.*;

public class bj12_2162 {
    static class Point {
        long x, y;

        public Point(long x, long y) {
            this.x = x;
            this.y = y;
        }
    }

    static class Line {
        Point p1, p2;

        public Line(Point p1, Point p2) {
            this.p1 = p1;
            this.p2 = p2;
        }
    }

    static int[] parent;
    static int[] size;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());

        Line[] lines = new Line[n + 1];
        parent = new int[n + 1];
        size = new int[n + 1];

        for (int i = 1; i <= n; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            Point p1 = new Point(Long.parseLong(st.nextToken()), Long.parseLong(st.nextToken()));
            Point p2 = new Point(Long.parseLong(st.nextToken()), Long.parseLong(st.nextToken()));
            lines[i] = new Line(p1, p2);
            parent[i] = i;
            size[i] = 1;
        }

        for (int i = 1; i <= n; i++) {
            for (int j = i + 1; j <= n; j++) {
                if (checkIntersection(lines[i].p1, lines[i].p2, lines[j].p1, lines[j].p2)) {
                    union(i, j);
                }
            }
        }

        int groupCount = 0;
        int maxSize = 0;

        for (int i = 1; i <= n; i++) {
            if (parent[i] == i) {
                groupCount++;
                maxSize = Math.max(maxSize, size[i]);
            }
        }

        System.out.println(groupCount);
        System.out.println(maxSize);
    }

    static int find(int x) {
        if (parent[x] == x)
            return x;
        return parent[x] = find(parent[x]);
    }

    static void union(int a, int b) {
        int rootA = find(a);
        int rootB = find(b);
        if (rootA != rootB) {
            parent[rootB] = rootA;
            size[rootA] += size[rootB];
        }
    }

    static int ccw(Point p1, Point p2, Point p3) {
        long res = (p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y);
        if (res > 0)
            return 1;
        else if (res < 0)
            return -1;
        return 0;
    }

    static boolean checkIntersection(Point p1, Point p2, Point p3, Point p4) {
        int ccw1 = ccw(p1, p2, p3);
        int ccw2 = ccw(p1, p2, p4);
        int ccw3 = ccw(p3, p4, p1);
        int ccw4 = ccw(p3, p4, p2);

        if (ccw1 * ccw2 == 0 && ccw3 * ccw4 == 0) {
            return Math.min(p1.x, p2.x) <= Math.max(p3.x, p4.x) &&
                    Math.min(p3.x, p4.x) <= Math.max(p1.x, p2.x) &&
                    Math.min(p1.y, p2.y) <= Math.max(p3.y, p4.y) &&
                    Math.min(p3.y, p4.y) <= Math.max(p1.y, p2.y);
        }
        return ccw1 * ccw2 <= 0 && ccw3 * ccw4 <= 0;
    }
}