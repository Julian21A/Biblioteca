package co.edu.iudigital.library.domain.usecase.author;

import co.edu.iudigital.library.domain.model.author.AuthorModel;
import co.edu.iudigital.library.domain.model.author.gateway.AuthorGateway;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
public class AuthorUseCase {

    private final AuthorGateway authorGateway;

    public Mono<AuthorModel> createAuthor(AuthorModel author) {
        return  authorGateway.createAuthor(author);
    }

    public Flux<AuthorModel> searchAuthors(String fullName) {
        return authorGateway.searchAuthors(fullName);
    }

    public Flux<AuthorModel> getAuthors() {
        return authorGateway.getAllAuthors();
    }

    public Mono<AuthorModel> updateAuthor(AuthorModel author) {
        return authorGateway.updateAuthor(author);
    }
}
