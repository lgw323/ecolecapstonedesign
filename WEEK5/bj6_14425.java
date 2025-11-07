import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.StringTokenizer;

/**
 * 백준 14425: 문자열 집합
 * - 문제 유형: 자료 구조 (해시)
 * - 알고리즘: HashSet
 *
 * [핵심 아이디어]
 * 1. M개의 문자열을 N개의 집합 S와 비교할 때, 단순 비교(이중 루프)는 O(N*M) * (문자열 길이) -> 시간 초과.
 * 2. 집합 S(N개의 문자열)를 `HashSet`에 저장합니다.
 * - 삽입: O(N * L) (L은 평균 문자열 길이)
 * 3. M개의 문자열을 `HashSet.contains()`로 검사합니다.
 * - 탐색: O(M * L) (해시 충돌이 없는 이상적인 경우)
 * 4. 총 시간 복잡도: O((N+M) * L)로 매우 효율적입니다.
 */
public class bj6_14425 {

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        int N = Integer.parseInt(st.nextToken());
        int M = Integer.parseInt(st.nextToken());

        // 1. 집합 S를 HashSet에 저장
        HashSet<String> setS = new HashSet<>();
        for (int i = 0; i < N; i++) {
            setS.add(br.readLine());
        }

        int count = 0;

        // 2. M개의 문자열을 HashSet에 포함되어 있는지(contains) 확인
        for (int i = 0; i < M; i++) {
            if (setS.contains(br.readLine())) {
                count++;
            }
        }

        System.out.println(count);
    }
}