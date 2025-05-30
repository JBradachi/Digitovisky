package br.ufv.digitovsky.digitovsky;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class DigitovskyApplication {

    public static void main(String[] args) {
        SpringApplication.run(DigitovskyApplication.class, args);
    }

    // Configura o CORS (Cross-Origin Resource Sharing) para pedidos da origem
    // em que o frontend executa. Sem isso, a comunicação HTTP entre front e
    // back é barrada pelo navegador
    @Bean public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET", "POST", "DELETE");
            }
        };
    }
}
