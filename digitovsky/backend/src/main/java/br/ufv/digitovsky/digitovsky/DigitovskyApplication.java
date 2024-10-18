package br.ufv.digitovsky.digitovsky;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.Arrays;

@SpringBootApplication
public class DigitovskyApplication {

	public static void main(String[] args) {
		SpringApplication.run(DigitovskyApplication.class, args);
	}

	@Autowired
	JdbcTemplate jdbc;

	@Bean
	public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
		return args -> {
			String apelido = jdbc.queryForObject( "SELECT apelido FROM TB_teste WHERE PK_duduAntunesS2 = 1", String.class);
			System.out.printf("Apelido: %s\n", apelido);
		};
	}
}
