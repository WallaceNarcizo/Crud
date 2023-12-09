package org.libertas.vendas;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.LinkedList;
import java.util.List;

public class PontoDAO {

	public void inserir(Ponto p) {
        Conexao con = new Conexao();

        try {
            String sql = "INSERT INTO ponto (nome, cidade, estado, mes_maior_rotatividade, hotel) VALUES (?, ?, ?, ?, ?)";
            PreparedStatement prep = con.getConnection().prepareStatement(sql);
            prep.setString(1, p.getNome());
            prep.setString(2, p.getCidade());
            prep.setString(3, p.getEstado());
            prep.setString(4, p.getRot());
            prep.setString(5, p.getHotel());
            prep.execute();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void alterar(Ponto p) {
        Conexao con = new Conexao();

        try {
            String sql = "UPDATE ponto SET nome = ?, cidade = ?, estado = ?, mes_maior_rotatividade = ?, hotel = ? WHERE id = ?";
            PreparedStatement prep = con.getConnection().prepareStatement(sql);
            prep.setString(1, p.getNome());
            prep.setString(2, p.getCidade());
            prep.setString(3, p.getEstado());
            prep.setString(4, p.getRot());
            prep.setString(5, p.getHotel());
            prep.setInt(6, p.getId());
            prep.execute();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void excluir(Ponto p) {
        Conexao con = new Conexao();

        try (Connection connection = con.getConnection()) {
            String sql = "DELETE FROM ponto WHERE id = ?";
            try (PreparedStatement prep = connection.prepareStatement(sql)) {
                prep.setInt(1, p.getId());
                prep.executeUpdate();
                System.out.println("Ponto excluído com sucesso!");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public Ponto consultar(int id) {
        Ponto p = new Ponto();
        Conexao con = new Conexao();

        try {
            String sql = "SELECT * FROM ponto WHERE id = " + id;
            Statement sta = con.getConnection().createStatement();
            ResultSet res = sta.executeQuery(sql);
            if (res.next()) {
                p.setNome(res.getString("nome"));
                p.setCidade(res.getString("cidade"));
                p.setEstado(res.getString("estado"));
                p.setRot(res.getString("mes_maior_rotatividade"));
                p.setHotel(res.getString("hotel"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        con.desconectar();
        return p;
    }

    public List<Ponto> listar() {
        List<Ponto> lista = new LinkedList<>();
        Conexao con = new Conexao();

        try {
            String sql = "SELECT * FROM ponto ORDER BY id";
            Statement sta = con.getConnection().createStatement();
            ResultSet res = sta.executeQuery(sql);
            while (res.next()) {
                Ponto p = new Ponto();
                p.setNome(res.getString("nome"));
                p.setCidade(res.getString("cidade"));
                p.setEstado(res.getString("estado"));
                p.setRot(res.getString("mes_maior_rotatividade"));
                p.setHotel(res.getString("hotel"));
                lista.add(p);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        con.desconectar();
        return lista;
    }
}
