package br.ufv.digitovsky.digitovsky;

public class ControladoraJogar {
    private int idFraseAtual;
    private ControladoraCrudTexto controladoraTexto;
    private TextoJogavel textoJogavel;

    public ControladoraJogar(ControladoraCrudTexto crudTexto) {
        this.idFraseAtual = -1;
        this.controladoraTexto = crudTexto;
        this.textoJogavel = new TextoJogavel();
    }

    private void carregaTexto(){
        String texto;
        try {
            texto = controladoraTexto.getTextoAtual();
        } catch(IllegalStateException ex) {
            System.err.println(ex.getMessage());
            texto = "";
        }
        textoJogavel.quebraTexto(texto);
    }

    public String getFrase(){
        String frase;

        if(this.idFraseAtual == -1){
            carregaTexto();
        }

        frase = textoJogavel.getProximaFrase(this.idFraseAtual);
        this.idFraseAtual++;
        return frase;
    }

    public int getIdFraseAtual(){
        return this.idFraseAtual;
    }

    public void setIdFraseAtual(int id){
        this.idFraseAtual = id;
    }
}
