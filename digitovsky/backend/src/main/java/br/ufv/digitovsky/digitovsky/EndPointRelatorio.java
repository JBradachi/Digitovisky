package br.ufv.digitovsky.digitovsky;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EndPointRelatorio {

    @Autowired
    private ControladoraRelatorio controladora;

    public EndPointRelatorio(){
        this.controladora = new ControladoraRelatorio();
    }

    @GetMapping("relatorio")
    public ResponseEntity<Map<String, String>> getRelatorio(){
        Map<String, String> response = new HashMap<>();
        controladora.salvaRelatorio();
        Relatorio relatorio = controladora.getRelatorio();

        // Somando com string vazia para converter para string
        response.put("totalErros", ("" + relatorio.getTotalErros()));
        response.put("totalTempo", ("" + relatorio.getTotalTempo()/60 + "m " + relatorio.getTotalTempo()%60 + "s"));
        response.put("mediaFraseSegundo", ("" + relatorio.getMediaFraseSegundo()));
        response.put("mediaErrosFrase", ("" + relatorio.getMediaErroFrase()));
        response.put("totalCaracteresDigitados", ("" + relatorio.getTotalCaracteresDigitados()));
        response.put("frasesPerfeitas", ("" + relatorio.getFrasesPerfeitas()));

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping(value = "relatorio/metrica", consumes = "application/json")
    public String postMetrica(@RequestBody MetricasFrase frase) {
        this.controladora.adicionaMetricasFrase(frase);
        return "{}";
    }

    @GetMapping("/resetRelatorio")
    public String resetRelatorio(){
        this.controladora.resetRelatorio();
        return "Relatório Resetado!";
    }
}