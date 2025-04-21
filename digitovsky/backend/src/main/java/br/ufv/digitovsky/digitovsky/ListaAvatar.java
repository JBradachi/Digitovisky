package br.ufv.digitovsky.digitovsky;

import java.io.File;
import java.util.ArrayList;

// Classe que representa a lista de avatares disponíveis. Ela carrega essa lista
// dinamicamente, inspecionando o diretório apropriado (que também é definido aqui)
public class ListaAvatar {
    private int avatarAtual;
    private ArrayList<String> listaAvatar;
    private final String DIR_IMAGENS = "imagens/avatares/";

    ListaAvatar() {
        avatarAtual = 0;
        listaAvatar = new ArrayList<String>();

        // Diretório de onde carregar os avatares
        File pasta = new File(DIR_IMAGENS);
        if(pasta != null) {
            File[] lista = pasta.listFiles();
            for(File avatar : lista)
                listaAvatar.add(avatar.getName());
        }
    }

    // Retorna o avatar atual
    public String getAvatarAtual() {
        return DIR_IMAGENS + listaAvatar.get(avatarAtual);
    }

    // Retorna o proximo avatar de forma circular e atualiza o avatar atual
    public String getNextAvatar() {
        if (listaAvatar.isEmpty()) return null;

        avatarAtual = (avatarAtual + 1) % listaAvatar.size();
        return getAvatarAtual();
    }

    // Retorna o avatar anterior de forma circular e atualiza o avatar atual
    public String getPrevAvatar() {
        if (listaAvatar.isEmpty()) return null;

        avatarAtual = (avatarAtual - 1 + listaAvatar.size()) % listaAvatar.size();
        return getAvatarAtual();
    }

    // Procurar dentro da lista de avatares qual endereço contém a string
    // passada como parâmetro e guardar sua posição em avatarAtual
    public int setAvatarAtual(String nome) {
        int index = listaAvatar.indexOf(nome);
        if (index != -1)
            avatarAtual = index;
        return index;
    }
}
