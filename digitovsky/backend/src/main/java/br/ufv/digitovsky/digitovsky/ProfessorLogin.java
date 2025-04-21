package br.ufv.digitovsky.digitovsky;

// Informações enviadas no login de professor
public class ProfessorLogin {
    public String email;
    public String senha; // criptografada, eu espero

    @Override
    public String toString() {
        return "email: " + email
            + "\nsenha: " + senha;
    }
}
