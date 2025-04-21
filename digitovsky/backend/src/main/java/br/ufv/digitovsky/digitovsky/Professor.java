package br.ufv.digitovsky.digitovsky;

public class Professor {

    // Atributos
    private String nomeProfessor;
    private String emailProfessor;
    private String senha;

    // Construtor
    public Professor() {
        this.nomeProfessor = "";
        this.emailProfessor = "";
        this.senha = "";
    }

    // Getters e Setters para os atributos da classe Professor
    public String getNomeProfessor() {
        return nomeProfessor;
    }

    public void setNomeProfessor(String nomeProfessor) {
        this.nomeProfessor = nomeProfessor;
    }

    public String getEmailProfessor() {
        return emailProfessor;
    }

    public void setEmailProfessor(String emailProfessor) {
        this.emailProfessor = emailProfessor;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    // Método para limpar as informacoes do professor
    public int limparInformacoes() {
        this.nomeProfessor = "";
        this.emailProfessor = "";
        this.senha = "";
        return 0; // Indica que as informacoes foram limpas com sucesso
    }
}

