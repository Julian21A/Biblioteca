package co.edu.iudigital.library.domain.usecase.author;

import co.edu.iudigital.library.domain.model.author.AuthorModel;
import co.edu.iudigital.library.domain.model.author.AuthorSearchModel;
import co.edu.iudigital.library.domain.model.author.DetailAuthorAndBooksResponseModel;
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

    public Flux<AuthorSearchModel> searchAuthors(String fullName) {
        return authorGateway.searchAuthors(fullName)
                .map(author -> new AuthorSearchModel(
                        author.id(),
                        author.firstName(),
                        author.lastName(),
                        author.bookCount() // Asegúrate de que `bookCount` esté disponible en `author`
                ));
    }


    public Flux<AuthorModel> getAuthors() {
        return authorGateway.getAllAuthors();
    }

    public Mono<AuthorModel> updateAuthor(AuthorModel author) {
        return authorGateway.updateAuthor(author);
    }

    public Mono<DetailAuthorAndBooksResponseModel> getAuthorDetailById(Integer id) {
        return authorGateway.findDetailAuthorById(id);
    }
}
