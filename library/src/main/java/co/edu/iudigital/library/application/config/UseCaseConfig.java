package co.edu.iudigital.library.application.config;

import co.edu.iudigital.library.domain.model.author.gateway.AuthorGateway;
import co.edu.iudigital.library.domain.model.user.gateway.UserGateway;
import co.edu.iudigital.library.domain.usecase.author.AuthorUseCase;
import co.edu.iudigital.library.domain.usecase.user.UserUseCase;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class UseCaseConfig {

    @Bean
    public AuthorUseCase authorUseCase(AuthorGateway authorGateway) { return new AuthorUseCase(authorGateway); }

    @Bean
    public UserUseCase userUseCase(UserGateway userGateway, PasswordEncoder passwordEncoder) {
        return new UserUseCase(userGateway, passwordEncoder);
    }


}
