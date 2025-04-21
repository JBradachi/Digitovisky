package br.ufv.digitovsky.digitovsky;

// Informações enviadas no cadastro de professor
public class ProfessorCadastro {
    public String nome;
    public String email;
    public String senha; // criptografada, eu espero
    public String iToken;

    @Override
    public String toString() {
        return "nome: " + nome
            + "\nemail: " + email
            + "\nsenha: " + senha
            + "\niToken: " + iToken;
    }
}
