package br.ufv.digitovsky.digitovsky;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.http.MediaType;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EndPointBack {
    private ControladoraAluno controladora;

    public EndPointBack() {
        this.controladora = new ControladoraAluno();
    }

    // Retorna o nome do aluno para o front
    @GetMapping("/aluno/nome")
    public String getNomeAluno() {
        return this.controladora.getNomeAluno();
    }

    // Modifica o nome do aluno
    @PostMapping("/aluno/nome")
    public void setNomeAluno(@RequestBody String nome) {
        this.controladora.setNomeAluno(nome);
    }

    // Fornece o nome do avatar do aluno
    @GetMapping("/aluno/avatar")
    public String getAvatarAluno() {
        return this.controladora.getAvatarAtual();
    }

    // Modifica o avatar do aluno
    @PostMapping("/aluno/avatar")
    public void setAvatarAtual(@RequestBody String avatar) {
        this.controladora.setAvatarAluno(avatar);
    }

    // Fornece o próximo avatar na lista
    @GetMapping("/aluno/nextAvatar")
    public String getNextAvatar() {
        return this.controladora.getNextAvatar();
    }

    // Fornece o avatar anterior na lista
    @GetMapping("/aluno/prevAvatar")
    public String getPrevAvatar() {
        return this.controladora.getPrevAvatar();
    }

    // Fornece a imagem do avatar atual
    @GetMapping("/images/avatars")
    public ResponseEntity<byte[]> getImagemAvatar() {
        String avatarAtual = this.controladora.getAvatarAtual();
        Path imagem = Paths.get(avatarAtual);
        if(!Files.exists(imagem)) {
            // Isso realmente não deveria acontecer na operação normal do
            // backend. Por isso o código de status indica um erro do servidor
            // e não que o recurso não foi encontrado
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(null);
        }
        try {
            byte[] conteudo = Files.readAllBytes(imagem);
            // Imagens poderão ser armazenadas como jpg ou png
            MediaType tipo = Files.probeContentType(imagem).contains("jpeg") ?
                MediaType.IMAGE_JPEG : MediaType.IMAGE_PNG;

            // Finalmente, deu tudo certo
            String nomeArq = imagem.getFileName().toString();
            String disp = "inline; filename\"" + nomeArq + "\"";
            return ResponseEntity .ok()
                .contentType(tipo)
                .header(HttpHeaders.CONTENT_DISPOSITION, disp)
                .body(conteudo);

        } catch(IOException ex) {
            // Outro erro interno do servidor. Dessa vez, o problema foi que não
            // foi possível ler os conteúdos do arquivo
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(null);
        }
    }
}
