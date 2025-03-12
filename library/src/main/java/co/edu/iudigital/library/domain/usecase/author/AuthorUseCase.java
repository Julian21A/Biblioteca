package co.edu.iudigital.library.domain.usecase.author;

import co.edu.iudigital.library.domain.model.author.AuthorModel;
import co.edu.iudigital.library.domain.model.author.gateway.AuthorGateway;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
public class AuthorUseCase {

    private final AuthorGateway authorGateway;

    public Mono<AuthorModel> createAuthor(AuthorModel author) {
        return authorGateway.isAuthorExist(author.code())
                .flatMap(existsAuthor -> {
                            if (existsAuthor) { return Mono.error(new RuntimeException("El autor ya existe")); }
                            return authorGateway.createAuthor(author);
                        }
                );

    }

    public Mono<AuthorModel> updateAuthor(AuthorModel author) {
        return authorGateway.updateAuthor(author);
    }
}
