package br.ufv.digitovsky.digitovsky;

public class Texto {
    private int idTexto;
    private String texto;
    private Dificuldade dificuldade;
    private int qntPalavras;
    private String titulo;

    // Construtor
    public Texto() {
        this.idTexto = -1;// Nenhum texto foi carregado
        this.texto = null;
        this.dificuldade = null;
        this.qntPalavras = 0;
        this.titulo = null;
    }

    public Texto(String texto, Dificuldade dificuldade, String titulo) {
        this();// Chama o construtor padrão
        this.setTexto(texto);
        this.setDificuldade(dificuldade);
        this.titulo = titulo;
    }

    public Texto(String texto, String dificuldade, String titulo) {
        this();
        this.setTexto(texto);
        this.carregarDificuldade(dificuldade);
        this.titulo = titulo;
    }

    // Getter
    public String getTexto() {
        if (this.idTexto == -1) {
            throw new IllegalStateException("Nenhum texto carregado.");
        }
        return this.texto;
    }

    public int getQntPalavras() {
        return this.qntPalavras;
    }

    public Dificuldade getDificuldade() {
        return this.dificuldade;
    }

    public String getTitulo() {
        return this.titulo;
    }

    //Setter
    public void setIdTexto(int id) {
        this.idTexto = id;
    }

    public void setTexto(String texto) {
        this.texto = texto;
        this.idTexto = 1; // Atualiza para indicar que um texto foi carregado
        this.setQntPalavras(texto);
    }

    private void setDificuldade(Dificuldade dificuldade) {
        if (dificuldade == null) {
            throw new IllegalArgumentException("Dificuldade não pode ser nula.");
        }
        this.dificuldade = dificuldade;
    }

    public void setDificuldade(String dificuldade) {
        setDificuldade(Texto.validaDificuldade(dificuldade));
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    // Método privado por ser de uso interno do objeto
    public void setQntPalavras(String texto) {
        if (texto != null && !texto.isEmpty()) {
            this.qntPalavras = texto.split("\\s+").length; // Divide o texto por espaços
        } else {
            this.qntPalavras = 0;
        }
    }

    // Método estático que verifica se foi digitada corretamente e retorna a dificuldade
    public static Dificuldade validaDificuldade(String nomeDificuldade) {
        if (nomeDificuldade == null || nomeDificuldade.isEmpty()) {
            throw new IllegalArgumentException("Nome da dificuldade não pode ser nulo ou vazio.");
        }

        nomeDificuldade = nomeDificuldade.trim().toLowerCase();

        switch (nomeDificuldade) {
            case "fácil":
                return Dificuldade.FACIL;
            case "média":
                return Dificuldade.MEDIO;
            case "difícil":
                return Dificuldade.DIFICIL;
            default:
                throw new IllegalArgumentException("Dificuldade inválida: " + nomeDificuldade);
        }
    }

    // Função extra para carregaar dificuldade

    public void carregarDificuldade(String nomeDificuldade) {
        this.setDificuldade(validaDificuldade(nomeDificuldade));
    }
}

