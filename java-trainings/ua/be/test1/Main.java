/**
 * 
 */
package ua.be.test1;

import ua.be.test2.Test2;

/**
 * @author Ivan
 *
 */
public class Main {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Test test = new Test(56);
		Test2 test2 = new Test2();
		System.out.println(test.getI() + test2.j);
		System.out.println("Test aplication");
	}

}
