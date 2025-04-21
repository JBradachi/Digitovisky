package br.ufv.digitovsky.digitovsky;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class AcessoBancoTexto {
    @Autowired
    private JdbcTemplate jdbc;

    @Autowired
    private AcessoBancoGeral bancoGeral;

    // Retorna um texto do banco de acordo com o id fornecido
    public Texto getTexto(int id) {
        String sql = "SELECT PK_id as id_texto, texto, dificuldade, titulo FROM TB_Textos"
            + " WHERE PK_id = ?";
        try {
            List<Texto> textos = jdbc.query(sql, new BeanPropertyRowMapper<>(Texto.class), id);
            return textos.get(0);
        } catch(EmptyResultDataAccessException ex){
            return null; // cadastro não existe no banco de dados
        } catch(Exception ex) {
            System.out.println(ex.getMessage());
            return null;
        }
    }

    // Apaga um texto do banco de acordo com o id fornecido
    public void deleteTexto(int id){
        String sql = "DELETE FROM TB_Textos WHERE PK_id = ?";
        try {
            jdbc.update(sql, id);
        } catch(EmptyResultDataAccessException ex){
            return;
        }
    }

    // Cadastra um texto no banco
    public void cadastraTexto(String texto, String titulo,
            Dificuldade dificuldade, String emailProfessor) throws IllegalArgumentException {
        if(bancoGeral.getInfoProfessor(emailProfessor) == null) {
            throw new IllegalArgumentException("Professor com email %s não existe no banco!\n");
        }
        System.err.println("Email do professor: " + emailProfessor);
        String sql = "INSERT INTO TB_Textos (texto, titulo, dificuldade, FK_Professor_email)"
        + " VALUES (?, ?, ?, ?)";
        jdbc.update(sql, texto, titulo, dificuldade.toString(), emailProfessor);
    }

    // Atualiza um texto de acordo com o id fornecido
    public void updateTexto(int id, String texto, String titulo,
            Dificuldade dificuldade) {
        String sql = "UPDATE TB_Textos SET texto = ?, titulo = ?, dificuldade = ?"
            + " WHERE PK_id = ?";
        try {
            jdbc.update(sql, texto, titulo, dificuldade.toString(), id);
        } catch(EmptyResultDataAccessException ex){
            return; // cadastro não existe no banco de dados
        }
    }

    // Retorna as informações de todos os textos
    public List<ProfessorTexto> getInfoTodosTextos(String emailProfessor) {
        if(bancoGeral.getInfoProfessor(emailProfessor) == null) {
            System.err.printf("Professor com email%s não existe no banco!\n",
                    emailProfessor);
            return null; // não há o que fazer
        }
        String sql = "SELECT PK_id as id, texto, titulo, dificuldade FROM TB_Textos"
            + " WHERE FK_Professor_email = ?";
        List<ProfessorTexto> lista = jdbc.query(sql,
                new BeanPropertyRowMapper<>(ProfessorTexto.class), emailProfessor);
        // Limitar as palavras a no máximo cinquenta
        for(ProfessorTexto pt : lista)
            pt.limitaPalavras();
        return lista;
    }
}
