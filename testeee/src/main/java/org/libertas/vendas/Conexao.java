package org.libertas.vendas;

import java.sql.Connection;
import java.sql.DriverManager;

public class Conexao {
	private Connection conexao;
	
	public Conexao() {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			//abre conexão com o banco de dados
			 conexao = DriverManager.getConnection(
		"jdbc:mysql://localhost/pontos?"
		+ "user=root&password=123");
			 
		} catch (Exception e) {
			e.printStackTrace();
		}
    }

    public void desconectar() {
        try {
            conexao.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Connection getConnection() {
        return conexao;
    }

    public void setConnection(Connection conexao) {
        this.conexao = conexao;
    }
}
