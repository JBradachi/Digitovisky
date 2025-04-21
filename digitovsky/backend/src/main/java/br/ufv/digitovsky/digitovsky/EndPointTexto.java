package br.ufv.digitovsky.digitovsky;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.web.client.RestTemplate;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EndPointTexto {
    private ControladoraJogar controladora = null;
    @Autowired private ControladoraCrudTexto crudTexto;

    // Simplesmente envia a frase obtida da controladora para o frontend
    @GetMapping("/jogo/frase")
    public ResponseEntity<Map<String, String>> getFrase() {
        Map<String, String> resp = new HashMap<>();
        // No documento de especificação da sprint está claramente escrito que
        // aqui poderia ocorrer um erro, mas, no momento, isso genuinamente não
        // parece ser uma possibilidade. Certamente isso vai mudar muito em
        // breve, mas por ora vou definir só o caminho feliz mesmo
        try{
            if(controladora == null)
                controladora = new ControladoraJogar(crudTexto);
            String frase = controladora.getFrase();
            resp.put("frase", frase);
            return ResponseEntity.ok().body(resp);
        } catch(Exception ex){
            resp.put("field", "banco de dados");
            resp.put("message", "Nenhum texto foi cadastrado!");
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(resp);
        }
    }

    // Cadastro de um novo texto
    @PostMapping(value = "/texto/create", consumes = "application/json")
    public ResponseEntity<Map<String, String>>
    cadastraTexto(@RequestBody CriaTexto pedido,
            @RequestHeader(value="Authorization") String emailProfessor) {
        System.err.println("Uai");
        Dificuldade dificuldade;
        Map<String, String> resp = new HashMap<>();
        try {
            dificuldade = Texto.validaDificuldade(pedido.dificuldade);
        } catch(IllegalArgumentException ex) {
            resp.put("field", "Cadastro de texto");
            resp.put("message", "dificuldade inválida");
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(resp);
        }

        try {
            crudTexto.cadastraTexto(pedido.texto, pedido.titulo, dificuldade,
                    emailProfessor);
            return ResponseEntity.ok().body(resp);
        } catch(IllegalArgumentException ex) {
            System.err.println(ex.getMessage());
            // Status HTTP 422: Unprocessable Content. Simplesmente, o recurso
            // solicitado não existe, então não há como atender ao pedido, ainda
            // que ele esteja sintaticamente correto e o acesso ao recurso, caso
            // existisse, fosse autorizado
            return ResponseEntity.status(422).body(null);
        }
    }

    // Retorna o conteúdo do texto pelo seu ID
    @GetMapping("/texto/visualizar/{id}")
    public String visualizaTexto(@PathVariable int id) {
        return crudTexto.visualizaTexto(id);
    }

    @GetMapping("/texto/getDificuldade")
    public String getDificuldadeTextoAtual(){
        RestTemplate restTemplate = new RestTemplate();

        try{
            return crudTexto.getDificuldadeTextoAtual().toString();
        } catch (Exception ex){
            Dotenv dotenv = Dotenv.configure()
                              .directory("/usr/local/service/.env")
                              .load();
            String ip = dotenv.get("ip");
            String rotaDificuldade = "http://" + ip + ":8080/texto/getDificuldade";

            String response = restTemplate.getForObject(rotaDificuldade, String.class);
            return response;
        }
    }

    @GetMapping("/texto/getInfoTextos")
    public ResponseEntity<List<ProfessorTexto>>
    getInfoTextos(@RequestHeader(value="Authorization") String emailProfessor) {
        List<ProfessorTexto> lista = crudTexto.getInfoTodosTextos(emailProfessor);
        if(lista == null)
            // Status HTTP 422: Unprocessable Content. Simplesmente, o recurso
            // solicitado não existe, então não há como atender ao pedido, ainda
            // que ele esteja sintaticamente correto e o acesso ao recurso, caso
            // existisse, fosse autorizado
            return ResponseEntity.status(422).body(null);
        return ResponseEntity.ok().body(lista);
    }

    @PostMapping(value = "/texto/update/{id}", consumes = "application/json")
    public ResponseEntity<Map<String, String>>
    updateTexto(@PathVariable int id, @RequestBody MudaTexto muda) {
        Dificuldade dificuldade;
        Map<String, String> resp = new HashMap<>();
        try {
            dificuldade = Texto.validaDificuldade(muda.dificuldade);
        } catch(IllegalArgumentException ex) {
            resp.put("field", "Atualização de texto");
            resp.put("message", "dificuldade inválida");
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(resp);
        }

        crudTexto.updateTexto(id, muda.texto, muda.titulo, dificuldade);
        return ResponseEntity.ok().body(null);
    }

    @DeleteMapping("/texto/delete/{id}")
    public ResponseEntity<Map<String, String>> deleteTexto(@PathVariable int id) {
        crudTexto.deleteTexto(id);
        return ResponseEntity.ok().body(null);
    }

    @PostMapping("/texto/escolheAtual/{id}")
    public ResponseEntity<String> escolheAtual(@PathVariable int id) {
        try {
            crudTexto.escolheTextoAtual(id);
            return ResponseEntity.ok().body(null);
        } catch(IllegalStateException ex) {
            System.err.println(ex.getMessage());
            // Status HTTP 422: Unprocessable Content. Simplesmente, o recurso
            // solicitado não existe, então não há como atender ao pedido, ainda
            // que ele esteja sintaticamente correto e o acesso ao recurso, caso
            // existisse, fosse autorizado
            return ResponseEntity.status(422).body(null);
        }
    }

    @GetMapping("/texto/recuperaAtual")
    public ResponseEntity <String> recuperaAtual() {
        Map<String, String> response = new HashMap<>();

        try{
            return ResponseEntity.ok().body(crudTexto.getTextoAtual());
        } catch(IllegalStateException ex){
            response.put("field", "banco de dados");
            response.put("message", "Nenhum texto foi cadastrado!");

            try{
                ObjectMapper objectMapper = new ObjectMapper();
                String jacksonData = objectMapper.writeValueAsString(response);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(jacksonData);
            } catch (Exception excecao){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro impossível!");
            }
        }
    }

    @GetMapping("/resetJogo")
    public String resetJogo(){
        if (this.controladora != null){
            this.controladora.setIdFraseAtual(-1);
            return "Jogo Resetado!";
        }
        return "A controladora do jogo ainda não foi iniciada!";
    }
}
