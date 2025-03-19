package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.author.adapter;

import co.edu.iudigital.library.domain.model.author.AuthorModel;
import co.edu.iudigital.library.domain.model.author.AuthorSearchModel;
import co.edu.iudigital.library.domain.model.author.DetailAuthorAndBooksResponseModel;
import co.edu.iudigital.library.domain.model.author.gateway.AuthorGateway;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.author.dto.AuthorEntity;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.author.mapper.AuthorMapperPostgres;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.author.repository.AuthorReactiveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
@RequiredArgsConstructor
public class AuthorAdapter implements AuthorGateway {

    private final AuthorMapperPostgres mapper;
    private final AuthorReactiveRepository authorReactiveRepository;


    @Override
    public Mono<AuthorModel> createAuthor(AuthorModel author) {
        return authorReactiveRepository.save(
                mapper.authorToAuthorEntity(author)
        )
                .map(mapper::authorEntityToAuthor);
    }

    @Override
    public Flux<AuthorModel> getAllAuthors() {

        return authorReactiveRepository.findAll()
                .map(mapper::authorEntityToAuthor);
    }

    @Override
    public Mono<AuthorModel> updateAuthor(AuthorModel author) {
        return authorReactiveRepository.findById(author.id())
                .switchIfEmpty(Mono.error(new RuntimeException("Author not found")))
                .flatMap(existingAuthor -> Mono.defer(() -> {
                    AuthorEntity updatedAuthor = new AuthorEntity(
                            existingAuthor.id(),
                            author.firstName() != null ? author.firstName() : existingAuthor.firstName(),
                            author.lastName() != null ? author.lastName() : existingAuthor.lastName(),
                            author.biography() != null ? author.biography() : existingAuthor.biography(),
                            author.librarianId() != 0 ? author.librarianId() : existingAuthor.librarianId(),
                            author.image() != null ? author.image() : existingAuthor.image()
                    );
                    return authorReactiveRepository.save(updatedAuthor);
                }))
                .map(mapper::authorEntityToAuthor);
    }

    @Override
    public Flux<AuthorSearchModel> searchAuthors(String fullName) {
        return Flux.fromArray(fullName.trim().split("\\s+"))
                .flatMap(authorReactiveRepository::searchByName)
                .map(mapper::authorEntitySearchToAuthorSearchModel)
                .distinct();
    }

    @Override
    public Mono<DetailAuthorAndBooksResponseModel> findDetailAuthorById(int authorId) {
        return authorReactiveRepository.searchDetailAuthorById(authorId)
                .map(mapper::detailAuthorAndBooksResponseModelToDetailAuthorAndBooksResponseModel);
    }


}
