package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.adapter;

import co.edu.iudigital.library.domain.model.book.BookModel;
import co.edu.iudigital.library.domain.model.book.gateway.BookGateway;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.dto.AuthorBookEntity;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.mapper.BookMapperPostgres;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.repository.AuthorBookReactiveRepository;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.repository.BookReactiveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
@RequiredArgsConstructor
public class BookAdapter implements BookGateway {

    private final BookReactiveRepository bookReactiveRepository;
    private final AuthorBookReactiveRepository authorBookReactiveRepository;
    private final BookMapperPostgres mapper;

    @Override
    public Mono<BookModel> registerBook(BookModel book) {

        return bookReactiveRepository.save(mapper.bookModelToBookEntity(book))
                .doOnNext(dato -> System.out.println("guardado: " + dato))
                .map(mapper::bookEntityToBookModel);

    }

    @Override
    public Mono<Void> saveAuthorBook(AuthorBookEntity authorBookEntity) {
        return authorBookReactiveRepository.save(authorBookEntity)
                .then();
    }
}
