package br.ufv.digitovsky.digitovsky;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ControladoraRelatorio {
    private Relatorio relatorio;
    @Autowired private AcessoBancoRelatorio banco;

    public ControladoraRelatorio(){
        this.relatorio = new Relatorio();
    }

    public void adicionaMetricasFrase(MetricasFrase metricasFrase) {
        this.relatorio.adicionaFrase(metricasFrase);
        return;
    }

    public Relatorio getRelatorio() {
        return relatorio;
    }

    public void salvaRelatorio() {
        relatorio.calcularMetricas();
        banco.salvaRelatorio(this.relatorio);
    }

    public void resetRelatorio(){
        this.relatorio = new Relatorio();
    }
}
