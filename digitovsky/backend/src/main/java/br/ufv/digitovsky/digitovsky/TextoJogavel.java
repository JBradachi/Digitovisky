package br.ufv.digitovsky.digitovsky;
import java.util.ArrayList;

public class TextoJogavel{
    private ArrayList<String> frasesTexto;

    public TextoJogavel(){
        frasesTexto = new ArrayList<>();
    }

    public void quebraTexto(String texto){
        frasesTexto.clear();
        texto = texto.replaceAll("\n", " ");

        while(texto.contains("  ")){
            texto = texto.replaceAll("  ", " "); //retira todos os espacos extras do texto
        }
        
        String[] palavras = texto.split(" ");
        StringBuilder fraseAtual = new StringBuilder(); // Auxiliara na manipulacao de strings

        for(String palavra : palavras) {
            // Verificando se podem ser adicionadas mais palavras
            if(fraseAtual.length() + palavra.length() + 1 <= 55) {
                if(fraseAtual.length() > 0) {
                    fraseAtual.append(" ");
                }
                fraseAtual.append(palavra);
                continue;
            }
            // Verificando se a frase tem pelo menos 40 caracteres
            if (fraseAtual.length() >= 40) {
                frasesTexto.add(fraseAtual.toString() + " ");
                fraseAtual = new StringBuilder(palavra);
            } else { // completando as frases caso sejam menores que 40
                while (fraseAtual.length() < 40 && fraseAtual.length() + palavra.length() + 1 <= 55) {
                    fraseAtual.append(" ").append(palavra);
                }
                frasesTexto.add(fraseAtual.toString() + " ");
                fraseAtual = new StringBuilder(palavra);
            }
        }
        // colocando a ultima frase sem o espaco final - como solicitado
        if (fraseAtual.length() > 0) {
            frasesTexto.add(fraseAtual.toString());
        }
    }

    public String getProximaFrase(int id){
        if(id == -1){
            if (frasesTexto.isEmpty() == false){
                return frasesTexto.get(0);
            }
        }
        int idSeguinte = id + 1;
        if (idSeguinte >= 0 && idSeguinte < frasesTexto.size()){
            return frasesTexto.get(idSeguinte);
        }
        // caso o id seja invalido ou for o da ultima frase, retornar string vazia
        return "";
    }
}
