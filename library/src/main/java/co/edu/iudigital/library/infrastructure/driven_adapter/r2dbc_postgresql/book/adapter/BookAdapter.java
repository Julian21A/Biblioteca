package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.adapter;

import co.edu.iudigital.library.domain.model.book.BookModel;
import co.edu.iudigital.library.domain.model.book.gateway.BookGateway;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.dto.AuthorBookEntity;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.mapper.BookMapperPostgres;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.repository.BookReactiveRepository;
import co.edu.iudigital.library.infrastructure.entry_point.book.mapper.BookMapper;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
public class BookAdapter implements BookGateway {

    private final BookReactiveRepository bookReactiveRepository;
    private final BookMapperPostgres mapper;

    @Override
    public Mono<BookModel> registerBook(BookModel book) {
        return bookReactiveRepository.save(mapper.bookModelToBookEntity(book))
                .map(mapper::bookEntityToBookModel);
    }

    @Override
    public Mono<Void> saveAuthorBook(AuthorBookEntity authorBookEntity) {
        return null;
    }
}
