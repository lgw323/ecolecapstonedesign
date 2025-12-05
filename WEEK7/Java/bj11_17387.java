import java.io.*;
import java.util.*;

public class bj11_17387 {
    static class Point {
        long x, y;

        public Point(long x, long y) {
            this.x = x;
            this.y = y;
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;

        st = new StringTokenizer(br.readLine());
        Point p1 = new Point(Long.parseLong(st.nextToken()), Long.parseLong(st.nextToken()));
        Point p2 = new Point(Long.parseLong(st.nextToken()), Long.parseLong(st.nextToken()));

        st = new StringTokenizer(br.readLine());
        Point p3 = new Point(Long.parseLong(st.nextToken()), Long.parseLong(st.nextToken()));
        Point p4 = new Point(Long.parseLong(st.nextToken()), Long.parseLong(st.nextToken()));

        System.out.println(checkIntersection(p1, p2, p3, p4));
    }

    static int ccw(Point p1, Point p2, Point p3) {
        long res = (p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y);
        if (res > 0)
            return 1;
        else if (res < 0)
            return -1;
        return 0;
    }

    static int checkIntersection(Point p1, Point p2, Point p3, Point p4) {
        int ccw1 = ccw(p1, p2, p3);
        int ccw2 = ccw(p1, p2, p4);
        int ccw3 = ccw(p3, p4, p1);
        int ccw4 = ccw(p3, p4, p2);

        if (ccw1 * ccw2 == 0 && ccw3 * ccw4 == 0) {
            if (Math.min(p1.x, p2.x) <= Math.max(p3.x, p4.x) &&
                    Math.min(p3.x, p4.x) <= Math.max(p1.x, p2.x) &&
                    Math.min(p1.y, p2.y) <= Math.max(p3.y, p4.y) &&
                    Math.min(p3.y, p4.y) <= Math.max(p1.y, p2.y)) {
                return 1;
            }
            return 0;
        }

        if (ccw1 * ccw2 <= 0 && ccw3 * ccw4 <= 0) {
            return 1;
        }

        return 0;
    }
}