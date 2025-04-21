package br.ufv.digitovsky.digitovsky;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Hello{

    @GetMapping("/teste")
    public String teste(){
        return "Tudo certo família";
    }
}