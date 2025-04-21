package br.ufv.digitovsky.digitovsky;

public enum Dificuldade {
    // Com formas textuais para facilitar
    FACIL("Fácil"),
    MEDIO("Média"),
    DIFICIL("Difícil");

    private final String descricao;

    private Dificuldade(String descricao) {
        this.descricao = descricao;
    }

    @Override
    public String toString() {
        return descricao;
    }
}

