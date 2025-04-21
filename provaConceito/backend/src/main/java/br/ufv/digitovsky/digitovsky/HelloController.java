package br.ufv.digitovsky.digitovsky;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;


@RestController
public class HelloController {

	@Autowired
	JdbcTemplate jdbc;

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/teste")
	public String teste(){
		return "Deu bom fml";
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/getText")
	public String getText(@RequestBody String str){
		String texto = jdbc.queryForObject( "SELECT texto FROM TB_texto WHERE titulo = ?", String.class, str);
		return texto;

	}
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/getAllText")
	public String getAllText(){
		List<String> titulos = jdbc.queryForList("SELECT titulo FROM TB_texto", String.class);
		String tudo = String.join("\n", titulos);
		return tudo;
	}
}
