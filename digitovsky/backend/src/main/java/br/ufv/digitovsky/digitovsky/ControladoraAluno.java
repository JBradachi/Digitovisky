package br.ufv.digitovsky.digitovsky;

// Controladora da lógica relacionada ao aluno, incluindo a seleção de avatares
public class ControladoraAluno  {
    private Aluno aluno;
    private ListaAvatar listaAvatar;

    ControladoraAluno() {
        aluno = new Aluno();
        listaAvatar = new ListaAvatar();
    }

    public String getNomeAluno() {
        return this.aluno.getNome();
    }

    public void setNomeAluno(String nome) {
        this.aluno.setNome(nome);
    }

    public String getAvatarAtual() {
        return this.listaAvatar.getAvatarAtual();
    }

    public void setAvatarAluno(String nomeArquivo) {
        this.listaAvatar.setAvatarAtual(nomeArquivo);
    }

    public String getNextAvatar() {
        return this.listaAvatar.getNextAvatar();
    }

    public String getPrevAvatar() {
        return this.listaAvatar.getPrevAvatar();
    }
}
