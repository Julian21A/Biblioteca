package co.edu.iudigital.library.application;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.r2dbc.repository.config.EnableR2dbcRepositories;

@SpringBootApplication(scanBasePackages = {"co.edu.iudigital.library"})
@EnableR2dbcRepositories(basePackages = "co.edu.iudigital.library")
@OpenAPIDefinition(info = @Info(title = "Ms_library", version = "1.0", description = "Documentación de los servicios de la biblioteca"))
public class LibraryApplication {

	public static void main(String[] args) {
		SpringApplication.run(LibraryApplication.class, args);
	}

}
