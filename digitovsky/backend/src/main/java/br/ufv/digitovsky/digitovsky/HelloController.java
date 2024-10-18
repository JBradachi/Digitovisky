package br.ufv.digitovsky.digitovsky;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

	@GetMapping("/")
	public String index() {
		
		
		return "<!doctype html> <html ng-app>  <head> <script src=\"https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js\"></script>  </head>  <body> <div>   <label>Name:</label>   <input type=\"text\" ng-model=\"yourName\" placeholder=\"Enter a name here\">   <hr>   <h1>Hello {{yourName}}!</h1> </div>  </body> </html>";
	}

	@GetMapping("/teste")
	public String teste(){
	
		return "{\"message\": \"deu bom fml\"}";
	}

}

 


