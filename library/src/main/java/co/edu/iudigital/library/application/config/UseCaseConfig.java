package co.edu.iudigital.library.application.config;

import co.edu.iudigital.library.domain.model.author.gateway.AuthorGateway;
import co.edu.iudigital.library.domain.model.book.gateway.BookGateway;
import co.edu.iudigital.library.domain.model.loan.gateway.LoanGateway;
import co.edu.iudigital.library.domain.model.user.gateway.UserGateway;
import co.edu.iudigital.library.domain.usecase.author.AuthorUseCase;
import co.edu.iudigital.library.domain.usecase.book.BookUseCase;
import co.edu.iudigital.library.domain.usecase.loan.LoanUseCase;
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

    @Bean
    public BookUseCase bookUseCase(BookGateway bookGateway) {
        return new BookUseCase(bookGateway);
    }

    @Bean
    public LoanUseCase loanUseCase(LoanGateway loanGateway) {
        return new LoanUseCase(loanGateway);
    }


}
