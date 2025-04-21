package br.ufv.digitovsky.digitovsky;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class AcessoBancoRelatorio {
    @Autowired
    JdbcTemplate jdbc;

    // Salva um novo relatório individual no banco de dados
    public void salvaRelatorio(Relatorio relatorio) {
        // Estou considerando que o id tem AUTO_INCREMENT

        String sql = "INSERT INTO TB_RelatorioIndividual "

            + "(totalTempo, totalErros, mediaFraseSegundo, mediaErrosFrase"
            + ", totalCaracteresDigitados, frasesPerfeitas)"
            + " VALUES (?, ?, ?, ?, ?, ?)";
        jdbc.update(sql, relatorio.getTotalTempo(), relatorio.getTotalErros(),
                relatorio.getMediaFraseSegundo(), relatorio.getMediaErroFrase(),
                relatorio.getTotalCaracteresDigitados(),
                relatorio.getFrasesPerfeitas());
    }
}
