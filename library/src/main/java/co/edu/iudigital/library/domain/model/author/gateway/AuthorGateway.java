package co.edu.iudigital.library.domain.model.author.gateway;

import co.edu.iudigital.library.domain.model.author.AuthorModel;
import co.edu.iudigital.library.domain.model.author.AuthorSearchModel;
import co.edu.iudigital.library.domain.model.author.DetailAuthorAndBooksResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface AuthorGateway {

    Mono<AuthorModel> createAuthor(AuthorModel author);
    Flux<AuthorModel> getAllAuthors();
    Mono<AuthorModel> updateAuthor(AuthorModel author);
    Flux<AuthorSearchModel> searchAuthors(String fullName);
    Mono<DetailAuthorAndBooksResponseModel> findDetailAuthorById(int authorId);

}
