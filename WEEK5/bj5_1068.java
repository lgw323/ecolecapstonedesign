import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.StringTokenizer;

public class bj5_1068 {
    static ArrayList<Integer> arr[];
    static Boolean visited[];
    static int N;
    static int root;
    static int deleted;
    static int leafcount;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        N = Integer.parseInt(br.readLine());
        arr = new ArrayList[N];
        visited = new Boolean[N];
        StringTokenizer st = new StringTokenizer(br.readLine());
        deleted = Integer.parseInt(br.readLine());
        for (int i = 0; i < arr.length; i++) {
            arr[i] = new ArrayList<>();
        }
        for (int now = 0; now < N; now++) {
            int parent = Integer.parseInt(st.nextToken());
            if (parent == -1) {
                root = now;
            } else {
                arr[parent].add(now);
            }
        }
        if (deleted == root) {
            System.out.println(0);
        } else {
            DFS(root);
            System.out.println(leafcount);
        }
    }

    static void DFS(int number) {
        visited[number] = true;
        boolean isLeaf = true;
        for (int child : arr[number]) {
            if (child == deleted) {
                continue;
            }
            isLeaf = false;
            DFS(child);
        }
        if (isLeaf) {
            leafcount++;
        }
    }
}
