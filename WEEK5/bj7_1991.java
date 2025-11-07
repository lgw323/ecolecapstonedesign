import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

/**
 * 백준 1991: 트리 순회
 * - 문제 유형: 트리, 재귀
 * - 알고리즘: 전위 순회 (Preorder), 중위 순회 (Inorder), 후위 순회 (Postorder)
 *
 * [핵심 아이디어]
 * 1. 'A'~'Z' 노드를 효율적으로 관리하기 위해 `Node` 객체 배열(크기 26)을 사용합니다.
 * 2. 'A'는 0, 'B'는 1 ... 인덱스로 변환하여 배열에 접근합니다. (c - 'A')
 * 3. 각 순회는 재귀 함수로 간단하게 구현됩니다.
 * - 전위 (루트 -> 좌 -> 우)
 * - 중위 (좌 -> 루트 -> 우)
 * - 후위 (좌 -> 우 -> 루트)
 */
public class bj7_1991 {

    static class Node {
        char left; // 왼쪽 자식 노드의 문자
        char right; // 오른쪽 자식 노드의 문자

        public Node(char left, char right) {
            this.left = left;
            this.right = right;
        }
    }

    static Node[] tree; // 노드 정보를 저장할 배열 (트리 본체)
    static StringBuilder sb = new StringBuilder();

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int N = Integer.parseInt(br.readLine());

        tree = new Node[N]; // 0='A', 1='B', ...

        // 1. 트리 구성
        for (int i = 0; i < N; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            char parent = st.nextToken().charAt(0);
            char left = st.nextToken().charAt(0);
            char right = st.nextToken().charAt(0);
            tree[parent - 'A'] = new Node(left, right);
        }

        // 2. 순회 시작 (루트는 항상 'A')
        preorder('A');
        sb.append("\n");
        inorder('A');
        sb.append("\n");
        postorder('A');
        sb.append("\n");

        System.out.println(sb);
    }

    // 전위 순회 (루트 -> 좌 -> 우)
    public static void preorder(char current) {
        if (current == '.')
            return; // 자식이 없으면 종료

        int idx = current - 'A';
        sb.append(current); // 1. 루트 방문
        preorder(tree[idx].left); // 2. 왼쪽 서브트리
        preorder(tree[idx].right); // 3. 오른쪽 서브트리
    }

    // 중위 순회 (좌 -> 루트 -> 우)
    public static void inorder(char current) {
        if (current == '.')
            return;

        int idx = current - 'A';
        inorder(tree[idx].left); // 1. 왼쪽 서브트리
        sb.append(current); // 2. 루트 방문
        inorder(tree[idx].right); // 3. 오른쪽 서브트리
    }

    // 후위 순회 (좌 -> 우 -> 루트)
    public static void postorder(char current) {
        if (current == '.')
            return;

        int idx = current - 'A';
        postorder(tree[idx].left); // 1. 왼쪽 서브트리
        postorder(tree[idx].right); // 2. 오른쪽 서브트리
        sb.append(current); // 3. 루트 방문
    }
}