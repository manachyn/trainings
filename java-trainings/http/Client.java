package http;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Date;

public class Client {
    protected String host;
    protected int port;
    protected int connectionsCount;

    public int getPort() {
        return port;
    }

    public String getHost() {
        return host;
    }

    public Client(String host, int port) {
        this.host = host;
        this.port = port;
    }

    public void connect() {
        try {
            Socket client = new Socket(host, port);
            connectionsCount++;
            handleConnection(client);
        } catch(UnknownHostException e) {
            System.out.println("Unknown host: " + host);
            e.printStackTrace() ;
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    protected void handleConnection(Socket socket) throws IOException {

        try (BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
             PrintWriter out = new PrintWriter(socket.getOutputStream(), true)) { // Try-with-resources
             out.println("Connection #" + connectionsCount + " " + new Date());

            //String line = in.readLine();
            //System.out.println(line);

        } finally {
            socket.close();
        }
    }


    public static void main(String[] args) {
        String host = "localhost";
        int port = 8081;
        if (args.length > 0) {
            host = args[0];
        }
        if (args.length > 1) {
            port = Integer.parseInt(args[1]);
        }
        Client client = new Client(host, port);
        int i = 0;
        while (i < 10) {
            client.connect();
            i++;
        }

    }
}
