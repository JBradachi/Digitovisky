package br.ufv.digitovsky.digitovsky;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
public class HelloController {

	@GetMapping("/")
	public String index() {
		
		
		return "<!doctype html> <html><head></head> body><h1>Hello, World!</h1></body> </html>";
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/teste")
	public String teste(){
		return "{\"message\": \"deu bom fml\"}";
	}

}
