package br.ufv.digitovsky.digitovsky;

import java.util.Arrays;

public class ProfessorTexto {

    public int id;
    public String texto;
    public String titulo;
    public String dificuldade;

    private final int NUM_PALAVRAS = 50;

    @Override
    public String toString() {
        return "id: " + id
            + "texto: " + texto
            + "\ntitulo: " + titulo
            + "\ndificuldade: " + dificuldade;
    }

    // Talvez tenha um jeito melhor de fazer isso. Mas esse vai servir
    // "Não há nada mais permanente do que uma solução temporária" - Sun Tzu
    public void limitaPalavras() {
        String[] palavras = this.texto.split("\\s+");
        if(palavras.length <= NUM_PALAVRAS) return; // feito

        palavras = Arrays.copyOfRange(palavras, 0, NUM_PALAVRAS + 1);
        this.texto = String.join(" ", palavras);
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setDificuldade(String dificuldade) {
        this.dificuldade = dificuldade;
    }
}
