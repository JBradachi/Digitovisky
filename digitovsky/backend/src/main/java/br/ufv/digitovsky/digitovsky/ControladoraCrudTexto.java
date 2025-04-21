package br.ufv.digitovsky.digitovsky;

import java.util.List;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ControladoraCrudTexto {
    private Texto textoAtual;
    private ConexaoHost conexaoHost;
    @Autowired private AcessoBancoTexto banco;

    public ControladoraCrudTexto() {
        this.textoAtual = new Texto();
        this.conexaoHost = new ConexaoHost();
    }

    // Adiciona um Texto ao BD
    public void cadastraTexto(String texto, String titulo, Dificuldade dificuldade,
            String emailProfessor) throws IllegalArgumentException {
        banco.cadastraTexto(texto, titulo, dificuldade, emailProfessor);
    }

    // Retorna um texto pelo seu ID
    public String visualizaTexto(int id) {
        return banco.getTexto(id).getTexto();
    }

    public List<ProfessorTexto> getInfoTodosTextos(String emailProfessor) {
        return banco.getInfoTodosTextos(emailProfessor);
    }

    public void deleteTexto(int id) {
        banco.deleteTexto(id);
    }

    public void updateTexto(int id, String texto, String titulo,
            Dificuldade dificuldade) {
        banco.updateTexto(id, texto, titulo, dificuldade);
    }

    public Dificuldade getDificuldadeTextoAtual() {
        return textoAtual.getDificuldade();
    }

    public void escolheTextoAtual(int id) throws IllegalStateException {
        Texto novoTexto = new Texto();
        novoTexto = this.banco.getTexto(id);
        if(novoTexto == null) throw new IllegalStateException("id inválido");
        novoTexto.setQntPalavras(novoTexto.getTexto());
        this.textoAtual = novoTexto;
    }

    public String getTextoAtual(){
        try{
            return this.textoAtual.getTexto();
        } catch(IllegalStateException ex){
            try{
                return this.conexaoHost.getTextoHost();
            } catch(IOException exHost){
                throw new IllegalStateException("Nenhum texto carregado.");
            }
        }
    }

}