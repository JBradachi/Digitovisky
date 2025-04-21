package br.ufv.digitovsky.digitovsky;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class AcessoBancoGeral {
    @Autowired
    private JdbcTemplate jdbc;

    // Retorna as informações de um professor a partir de seu email
    public Professor getInfoProfessor(String email) {
        // Talvez deixar o nome das propriedades diferente entre a classe Java
        // e a tabela no banco de dados não tenha sido uma ideia tão boa
        String sql = "SELECT nome AS nomeProfessor, PK_email AS emailProfessor,"
            + " senha FROM TB_Professor WHERE PK_email = ?";
        try {
            Professor prof = jdbc.queryForObject(sql, new BeanPropertyRowMapper<>(Professor.class), email);
            return prof;
        } catch(EmptyResultDataAccessException ex) {
            return null; // cadastro não existe no banco de dados
        }
    }

    // Atualiza a tabela com as informações de um professor
    public void setInfoProfessor(String email, String senha, String nome) {
        // Essa query atualiza a linha correspondente ao professor caso ela já
        // exista. Do contrário, a linha é criada. Isso torna esse método mais
        // flexível, pois pode ser usado para os dois propósitos
        String sql = "INSERT INTO TB_Professor (PK_email, senha, nome)"
            + " VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE nome = ?, senha = ?";
        jdbc.update(sql, email, senha, nome, nome, senha);
    }
}
