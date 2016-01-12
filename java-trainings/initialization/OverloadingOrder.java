package initialization;

/*
 * Порядок вызова перегруженных методов определяется
 * количеством, типом и порядком аргументов
 */
public class OverloadingOrder {
	static void f(String s, int i) {
		System.out.println("String: " + s + ", int: " + i);
	}
	
	static void f(int i, String s) {
		System.out.println("int: " + i + ", String: " + s);
	}
	
	public static void main(String[] args) {
		f("Строка сначала", 11);
		f(99, "Строка вконце");
	}
}
