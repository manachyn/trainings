package im;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Enumeration;
import java.util.Properties;

public class App1 {

	public App1() {
		
		// Информация окружения JVM
		Properties p = System.getProperties();
		
		// Отладка приложения в зависимости переменной окружения(VM arguments -Dapp.java.debug=true)
		if (Boolean.valueOf(p.getProperty("app.java.debug")) == true) {
			// Enumeration e = p.elements(); // Возвращает интерфейс
			// Enumeration, через котрый можно получить доступ к списку значений
			// свойств JVM
			Enumeration i = p.keys(); // Возвращает интерфейс Enumeration, через
										// котрый можно получить доступ к списку
										// ключей свойств JVM
			// Указатель в e стоит выше первого

			while (i.hasMoreElements()) {
				// System.out.println(e.nextElement());
				String key = i.nextElement().toString();
				System.out.println(key + " - " + p.getProperty(key));
			}
			
			System.out.println(p.getProperty("file.separator"));
		}
		
		//Но использовать пути с учетем ОС можно через спец класс
			
		File file = new File("D:/Creative/Development/Workspace/First/Hello.java");//Привязывает к диску с которого запущена JVM
		//System.out.println(file.getAbsolutePath());
			
		//Запуск внешнего процесса
		System.out.println("---- Before notepad");
		try {
			Process pr = Runtime.getRuntime().exec("notepad " + file.getAbsolutePath());
			if(pr.waitFor() != 0){//Возвращает код завершения процесса(если  = 0 - корректное завершение)
				throw new Exception("Редактирование прервано");
			}
			System.out.println("---- After notepad");
				
			//Запуск компилятора javac
			File jc = new File("C:/Program Files/Java/jdk1.6.0_30/bin/javac.exe");
			if(!jc.isFile()){
				throw new Exception("Компилятор не доступен");
			}
			Process pr1 = Runtime.getRuntime().exec(jc.getAbsolutePath() + " " + file.getAbsolutePath());
			if(pr1.waitFor() != 0){
				throw new MyProcessException(pr1, "Ошибки компиляции");
			}
			System.out.println("---- After javac");
				
			//Создаем загружчик
			Class c = new MyClassLoader().findClass(file.getAbsolutePath().substring(0, file.getAbsolutePath().lastIndexOf(".")));
			System.out.println(c);
			//System.out.println(c.getClassLoader());
			
		}
		catch(MyProcessException pe){
			System.out.println(pe.getMessage());
		} 
		catch (Exception e) {
			System.err.println(e.getLocalizedMessage());
		}
		
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		//Определяем текущий поток
		//System.out.println(Thread.currentThread());
		//System.out.println("---------------");
		
		//Определяем текущий ClassLoader
		//System.out.println(Thread.currentThread().getContextClassLoader());// sun.misc.Launcher$AppClassLoader - загружчик классов в main 
		
		App1 a = new App1();
	}
	
	private class MyProcessException extends Exception{
		private Process p;
		private String m;
		private MyProcessException(Process p0, String s1){
			p = p0;
			m = s1;
		}
		
		@Override
		public String getMessage() {
			return m + getProcessMessage();
		}
		
		@Override
		public String toString() {
			return m;
		}
		
		private String getProcessMessage(){
			InputStream in = p.getErrorStream();//Входной поток с текстом ошибок
			byte [] b = new byte[10000];//Резервируем место в куче
			int c = 0;
			try {
				c = in.read(b);//В масив байт(в кучу) заганяем сообщение ошибки; возвращаем ко-во считаных байт c
			} catch (IOException e) {
				System.out.println("---- " + e);
			}
			try {
				return "\r\n" + new String(b, 0, c, System.getProperty("file.encoding"));
			} catch (Exception e) {
				System.out.println("----" + e);
				return e.getMessage();
			}
		}
	}
	
	
	

}
