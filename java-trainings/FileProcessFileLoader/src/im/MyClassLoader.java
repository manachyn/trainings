package ua.rba;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

public class MyClassLoader extends ClassLoader{

	public MyClassLoader() {
		// TODO Auto-generated constructor stub
	}

	@Override
	protected Class<?> findClass(String filename) throws ClassNotFoundException {
		// TODO Auto-generated method stub
		//return super.findClass(arg0);
		File f = new File(filename + ".class");
		if(!f.isFile()){
			throw new ClassNotFoundException("Класс не найден " + filename);
		}
		
		InputStream in = null;//Файловый поток
		try {
			//Грузим класс в статический контекст
			in = new BufferedInputStream(new FileInputStream(f));
			byte b[] = new byte[(int)f.length()];
			in.read(b);
			Class c = defineClass("Hello", b, 0, b.length);
			return c;
		} catch (IOException e) {
			e.printStackTrace();
			throw new ClassNotFoundException("Проблемы с загрузкой: " + e.getMessage());
		} catch (ClassFormatError e) {
			throw new ClassNotFoundException("Проблемы с byte кодом: " + e.getMessage());
		}finally{
			try {
				in.close();
			} catch (IOException ioe) {
				// TODO Auto-generated catch block
				ioe.printStackTrace();
			}
		}
	}

}
