package br.ufv.digitovsky.digitovsky;

public class MetricasFrase {
    private int qntErros;
    private int tamanhoFrase;
    private int tempoGasto;
    //possui dois metodos construtores para simplificar possiveis utilizações
    public MetricasFrase() {
        this.qntErros = 0;
        this.tamanhoFrase = 0;
        this.tempoGasto = 0;
    }

    public MetricasFrase(int qntErros, int tamanhoFrase, int tempoGasto) {
        this.qntErros = qntErros;
        this.tamanhoFrase = tamanhoFrase;
        this.tempoGasto = tempoGasto;
    }
    //metodos getters
    public int getQntErros() {
        return qntErros;
    }

    public int getTamanhoFrase() {
        return tamanhoFrase;
    }

    public int getTempoGasto() {
        return tempoGasto;
    }
    //metodos setters
    public void setQntErros(int qntErros) {
        this.qntErros = qntErros;
    }

    public void setTamanhoFrase(int tamanhoFrase) {
        this.tamanhoFrase = tamanhoFrase;
    }

    public void setTempoGasto(int tempoGasto) {
        this.tempoGasto = tempoGasto;
    }
}
