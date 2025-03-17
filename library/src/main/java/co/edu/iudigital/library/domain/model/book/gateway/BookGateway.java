package co.edu.iudigital.library.domain.model.book.gateway;

import co.edu.iudigital.library.domain.model.book.BookModel;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.dto.AuthorBookEntity;
import reactor.core.publisher.Mono;

public interface BookGateway {
Mono<BookModel> registerBook(BookModel book);
Mono<Void> saveAuthorBook(AuthorBookEntity authorBookEntity);
}
