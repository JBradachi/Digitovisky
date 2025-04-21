package br.ufv.digitovsky.digitovsky;

import io.github.cdimascio.dotenv.Dotenv;
import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;

public class ConexaoHost {

  private RestTemplate restTemplate;

  public ConexaoHost(){
    this.restTemplate = new RestTemplate();
  }

  public String getTextoHost() throws IOException{

    Dotenv dotenv = Dotenv.configure()
                              .directory("/usr/local/service/.env")
                              .load();
    String ip = dotenv.get("ip");
    String rotaProfessor = "http://" + ip + ":8080/texto/recuperaAtual";

    System.out.println(rotaProfessor);
    
    try{
      String response = restTemplate.getForObject(rotaProfessor, String.class);

      System.out.println("Texto recebido: " + response);
      return response;

    } catch(HttpClientErrorException ex){
        // Lancando a excecao com uma mensagem falha de conexao
        throw new IOException("Erro: Não foi possível realizar a conexão ao host");
    }
  }
}
