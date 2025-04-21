package br.ufv.digitovsky.digitovsky;

import java.util.regex.Pattern;
import java.util.regex.Matcher;
import io.github.cdimascio.dotenv.Dotenv;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ControladoraProfessor {
    private Professor professor;
    @Autowired private AcessoBancoGeral banco;

    public ControladoraProfessor() {
        professor = new Professor();
    }

    // getters e setters da classe professor
    public String getNomeProfessor() {
        return this.professor.getNomeProfessor();
    }

    public void setNomeProfessor(String nome){
        this.professor.setNomeProfessor(nome);
    }

    public String getSenhaProfessor(){
        return this.professor.getSenha();
    }

    public void setSenhaProfessor(String senha){
        this.professor.setSenha(senha);
    }

    public String getEmailProfessor(){
        return this.professor.getEmailProfessor();
    }

    public void setEmailProfessor(String email) {
        this.professor.setEmailProfessor(email);
    }

    // Método responsável por verificar se, no momento do login, o professor está
    // cadastrado no banco.
    public int validaLogin(String email, String senha){
        Professor professorValidacao; // não sei se aqui devo chamar o construtor (acho que não)
        professorValidacao = banco.getInfoProfessor(email);
        if (professorValidacao == null) return -1;
        // Não sei por que razão ficou sem o check da senha por tanto tempo
        if (!professorValidacao.getSenha().equals(senha)) return -2;
        // Aproveitando que temos as informações todas, já preenchemos o nome
        this.setNomeProfessor(professorValidacao.getNomeProfessor());
        return 0;
    }

    // Método responsável por cadastrar o professor no banco, caso o iToken esteja correto
    public int cadastraProfessor(String nome, String senha, String email, String iToken){
        // Validação de e-email extremamente simples com regex
        Pattern emailPat = Pattern.compile("^(\\p{L}|[0-9+_.-])+@.+$");
        Matcher validaEmail = emailPat.matcher(email);
        // Sim, o correto seria criar uma exceção específica para esse caso.
        // Me xingue depois
        if(!validaEmail.matches()) return -2; // erro de email

        Dotenv dotenv = Dotenv.configure()
                              .directory("/usr/local/service/.env")
                              .load();
        String iTokenEnv = dotenv.get("iToken");

        if (iToken.equals(iTokenEnv)) {
            banco.setInfoProfessor(email, senha, nome);
            return 0;
        } else return -1;
    }

    // Limpa as informações do Professor
    public int limparInformacoes() {
        int result = this.professor.limparInformacoes();
        return result;
    }

}
