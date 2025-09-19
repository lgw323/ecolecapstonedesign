import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class bj4_11004 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        int want = Integer.parseInt(st.nextToken());
        st = new StringTokenizer(br.readLine());
        int[] arr = new int[n];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = Integer.parseInt(st.nextToken());
        }
        quickSort(arr, 0, n - 1, want - 1);
        System.out.println(arr[want - 1]);
    }

    public static void quickSort(int[] arr, int left, int right, int want) {
        if (left >= right) {
            return;
        }
        int pivotIndex = partitian(arr, left, right);
        if (want == pivotIndex) {
            return;
        } else if (pivotIndex > want) {
            quickSort(arr, left, pivotIndex - 1, want);
        } else if (pivotIndex < want) {
            quickSort(arr, pivotIndex + 1, right, want);
        }
    }

    public static int partitian(int[] arr, int left, int right) {
        int pivot = arr[right];
        int i = left - 1;
        int tmp = 0;
        for (int j = left; j < right; j++) {
            if (arr[j] < pivot) {
                i++;
                tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
        }
        tmp = arr[i + 1];
        arr[i + 1] = arr[right];
        arr[right] = tmp;
        return i + 1;
    }
}