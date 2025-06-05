package co.edu.iudigital.library.domain.usecase.book;

import co.edu.iudigital.library.domain.model.book.BookModel;
import co.edu.iudigital.library.domain.model.book.BooksAndAuthorsModel;
import co.edu.iudigital.library.domain.model.book.DetailBookAuthorModel;
import co.edu.iudigital.library.domain.model.book.gateway.BookGateway;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.dto.AuthorBookEntity;
import co.edu.iudigital.library.infrastructure.entry_point.book.dto.response.BooksByUserResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RequiredArgsConstructor
public class BookUseCase {
    private final BookGateway gateway;

    public Mono<BookModel> registerBook(BookModel book) {
        List<Integer> authorIds = parseAuthorIds(book.authors());

        return gateway.registerBook(book)
                .flatMap(savedBook -> saveAuthors(savedBook.id(), authorIds)
                        .thenReturn(savedBook));
    }

    private Mono<Void> saveAuthors(Integer bookId, List<Integer> authorIds) {
        return Flux.fromIterable(authorIds)
                .flatMap(authorId -> gateway.saveAuthorBook(new AuthorBookEntity(null, authorId, bookId)))
                .then();
    }


    private List<Integer> parseAuthorIds(String authorIds) {
        if (authorIds == null || authorIds.isBlank()) {
            return List.of();
        }

        return Stream.of(authorIds.split(","))
                .map(String::trim)
                .filter(id -> !id.isEmpty())
                .map(Integer::parseInt)
                .collect(Collectors.toList());
    }

    public Flux<BooksAndAuthorsModel> searchAuthorByName(String fullName) {
        return gateway.searchBookByName(fullName);
    }

    public Mono<DetailBookAuthorModel> getDetailBookAuthor(Integer bookId) {
        return gateway.getDetailsBook(bookId);
    }

    public Mono<Void> deleteBook(Integer id) {
        return gateway.deleteBook(id);
    }

    public Flux<BooksByUserResponseDTO> getBooksByUsers(int id) {
        return gateway.getBooksByUsers(id);
    }

    public Mono<BookModel> updateBook(BookModel book) {
        return gateway.updateBook(book);}
}
