package br.ufv.digitovsky.digitovsky;

import java.util.ArrayList;
import java.util.List;

public class Relatorio {
    private int totalTempo;
    private int totalErros;
    private double mediaFraseSegundo;
    private double mediaErroFrase;
    private int totalCaracteresDigitados;
    private int frasesPerfeitas;
    private List<MetricasFrase> listaFrases;

    public Relatorio() {
        this.totalTempo = 0;
        this.totalErros = 0;
        this.mediaFraseSegundo = 0;
        this.mediaErroFrase = 0;
        this.totalCaracteresDigitados = 0;
        this.frasesPerfeitas = 0;
        listaFrases = new ArrayList<>();
    }
    //Setters de forma privativa
    private void setTotalTempo(int totalTempo) {
        this.totalTempo = totalTempo;
    }

    private void setTotalErros(int totalErros) {
        this.totalErros = totalErros;
    }

    private void setMediaFraseSegundo(double mediaFraseSegundo) {
        this.mediaFraseSegundo = mediaFraseSegundo;
    }

    private void setMediaErroFrase(double mediaErroFrase) {
        this.mediaErroFrase = mediaErroFrase;
    }

    private void setTotalCaracteresDigitados(int totalCaracteresDigitados) {
        this.totalCaracteresDigitados = totalCaracteresDigitados;
    }

    private void setFrasesPerfeitas(int frasePerfeita) {
        this.frasesPerfeitas = frasePerfeita;
    }
    //Getters
    public int getTotalTempo() {
        return totalTempo;
    }

    public int getTotalErros() {
        return totalErros;
    }

    public double getMediaFraseSegundo() {
        return mediaFraseSegundo;
    }

    public double getMediaErroFrase() {
        return mediaErroFrase;
    }

    public int getTotalCaracteresDigitados() {
        return totalCaracteresDigitados;
    }

    public int getFrasesPerfeitas() {
        return frasesPerfeitas;
    }
    //adiciona um novo objeto a lista
    public void adicionaFrase(MetricasFrase frase) {
        listaFrases.add(frase);
    }

    public void calcularMetricas() {
        //cria variaveis temporárias para armazenar os valores
        int totalTempo = 0;
        int totalErros = 0;
        double mediaFraseSegundo = 0;
        double mediaErroFrase = 0;
        int totalCaracteresDigitados = 0;
        int frasePerfeita = 0;
        //Percorre a lista de frases fazendo a soma dos valores
        for (MetricasFrase frase : listaFrases) {
            totalTempo += frase.getTempoGasto();
            totalErros += frase.getQntErros();
            totalCaracteresDigitados += frase.getTamanhoFrase();
            if (frase.getQntErros() == 0) {
                frasePerfeita++;
            }
        }
        //condição para evitar divisão por zero
        if (listaFrases.size() > 0) {
            mediaFraseSegundo = totalTempo / listaFrases.size();
            mediaErroFrase = totalErros / listaFrases.size();
        }
        //insere os valores calculados nos atributos
        setTotalTempo(totalTempo);
        setTotalErros(totalErros);
        setMediaFraseSegundo(mediaFraseSegundo);
        setMediaErroFrase(mediaErroFrase);
        setTotalCaracteresDigitados(totalCaracteresDigitados);
        setFrasesPerfeitas(frasePerfeita);
    }

}
