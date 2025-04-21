package br.ufv.digitovsky.digitovsky;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/professor")
public class EndPointProfessor {
    @Autowired
    private ControladoraProfessor controladora;

    @PostMapping(value = "/login", consumes = "application/json")
    public ResponseEntity<Map<String, String>> validaLogin(@RequestBody ProfessorLogin login) {
        Map<String, String> response = new HashMap<>();
        int confirmacaoLogin = this.controladora
            .validaLogin(login.email, login.senha);

        if (confirmacaoLogin == 0) {
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } else {
            response.put("field", "Login");
            response.put("message", "A senha e/ou o email estão incorretos!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    // Realiza o cadastro do professor no banco de dados
    @PostMapping(value = "/cadastro", consumes = "application/json")
    public ResponseEntity<Map<String, String>> cadastraProfessor(@RequestBody ProfessorCadastro cadastro) {
        Map<String, String> response = new HashMap<>();
        System.out.println("Cadastro obtido:\n" + cadastro);

        int confirmacaoBanco = this.controladora
            .cadastraProfessor(cadastro.nome, cadastro.senha, cadastro.email,
                    cadastro.iToken);

        if(confirmacaoBanco == 0) {
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } else if(confirmacaoBanco == -2) {
            response.put("field", "Cadastro");
            response.put("message", "Endereço de e-mail inválido!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } else {
            response.put("field", "Banco de Dados");
            response.put("message", "O iToken fornecido está incorreto!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @GetMapping("/limpar")
    public void limpaInformacoes() {
        this.controladora.limparInformacoes();
        return;
    }
}
