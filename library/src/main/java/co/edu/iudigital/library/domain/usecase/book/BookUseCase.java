package co.edu.iudigital.library.domain.usecase.book;

import co.edu.iudigital.library.domain.model.book.BookModel;
import co.edu.iudigital.library.domain.model.book.gateway.BookGateway;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.dto.AuthorBookEntity;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@RequiredArgsConstructor
public class BookUseCase {

    private final BookGateway gateway;

    public Mono<BookModel> registerBook(BookModel book) {
        return gateway.registerBook(book)
                .flatMap(savedBook -> saveAuthors(savedBook.id(), savedBook.authors())
                        .thenReturn(savedBook));
    }

    private Mono<Void> saveAuthors(Integer bookId, List<Integer> authorIds) {
        return Flux.fromIterable(authorIds)
                .flatMap(authorId -> gateway.saveAuthorBook(new AuthorBookEntity(null, authorId, bookId)))
                .then();
}
}
