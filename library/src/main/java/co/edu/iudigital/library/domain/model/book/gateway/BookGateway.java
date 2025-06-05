package co.edu.iudigital.library.domain.model.book.gateway;

import co.edu.iudigital.library.domain.model.book.BookModel;
import co.edu.iudigital.library.domain.model.book.BooksAndAuthorsModel;
import co.edu.iudigital.library.domain.model.book.BooksByAuthor;
import co.edu.iudigital.library.domain.model.book.DetailBookAuthorModel;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.dto.AuthorBookEntity;
import co.edu.iudigital.library.infrastructure.entry_point.book.dto.request.UpdateBookRequestDTO;
import co.edu.iudigital.library.infrastructure.entry_point.book.dto.response.BooksByUserResponseDTO;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface BookGateway {
Mono<BookModel> registerBook(BookModel book);
Mono<Void> saveAuthorBook(AuthorBookEntity authorBookEntity);
Flux<BooksByAuthor> findAllBooksByAuthorId(Integer authorId);
Flux<BooksAndAuthorsModel> searchBookByName(String fulName);
Mono<DetailBookAuthorModel> getDetailsBook(Integer bookId);
Mono<Void> deleteBook(Integer id);
Flux<BooksByUserResponseDTO> getBooksByUsers(int id);
Mono<BookModel>updateBook(BookModel book);
}
