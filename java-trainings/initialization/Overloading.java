package initialization;

/*
 * Перегрузка - определение методов с одиннаковыми именами 
 * но с разным количеством аргументов;
 * Очередность загрузки определяется количеством и порядком аргументов  
 * Если в классе определен только констуктор с параметром то конструктор по умолчанию уже не доступен
 *  
 */
class Tree {
	int height;
	
	/*
	 * Конструктор по умолчанию(без параметров)
	 */
	Tree() {
		System.out.println("Вызов контруктора по умолчанию");
	    height = 0;
	}
	
	/*
	 * Перегрузка контсруктора
	 */
	Tree(int initialHeight) {
		height = initialHeight;
		System.out.println("Вызов конструктора с параметром Int initialHeight = " + height);
	}	
	  
	void info() {
		System.out.println("Вызов метода без параметра");
	}
	
	void info(String s) {
		System.out.println("Вызов метода c параметром String s = " + s);
	}
}

public class Overloading {
	
	public static void main(String[] args) {
		for(int i = 0; i < 5; i++) {
			Tree t = new Tree(i);
			t.info();
			t.info("перегружены метод");
		}
		
		new Tree();
	}
}
