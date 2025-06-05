package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.adapter;

import co.edu.iudigital.library.domain.model.book.BookModel;
import co.edu.iudigital.library.domain.model.book.BooksAndAuthorsModel;
import co.edu.iudigital.library.domain.model.book.BooksByAuthor;
import co.edu.iudigital.library.domain.model.book.DetailBookAuthorModel;
import co.edu.iudigital.library.domain.model.book.gateway.BookGateway;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.dto.AuthorBookEntity;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.dto.BookEntity;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.dto.UpdateBookEntity;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.mapper.BookMapperPostgres;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.repository.AuthorBookReactiveRepository;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.repository.BookReactiveRepository;
import co.edu.iudigital.library.infrastructure.entry_point.book.dto.response.BooksByUserResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Repository
@RequiredArgsConstructor
public class BookAdapter implements BookGateway {

    private final BookReactiveRepository bookReactiveRepository;
    private final AuthorBookReactiveRepository authorBookReactiveRepository;
    private final BookMapperPostgres mapper;

    @Override
    public Mono<BookModel> registerBook(BookModel book) {

        return bookReactiveRepository.save(mapper.bookModelToBookEntity(book))
                .map(mapper::bookEntityToBookModel);

    }

    @Override
    public Mono<Void> saveAuthorBook(AuthorBookEntity authorBookEntity) {
        return authorBookReactiveRepository.save(authorBookEntity)
                .then();
    }

    @Override
    public Flux<BooksByAuthor> findAllBooksByAuthorId(Integer authorId) {
        return authorBookReactiveRepository.findBooksInfoByAuthorId(authorId)
                .map(mapper::authorBookEntityToBooksByAuthor);


    }

    @Override
    public Flux<BooksAndAuthorsModel> searchBookByName(String fulName) {
        return bookReactiveRepository.findAllAuthorsBooks(fulName)
                .map(mapper::booksAndAuthorsEntityToBooksAndAuthorsModel);
    }

    @Override
    public Mono<DetailBookAuthorModel> getDetailsBook(Integer bookId) {
        return bookReactiveRepository.findBookById(bookId)
                .map(mapper::detailBookAuthorEntityToDetailBookAuthorModel);
    }

    @Override
    public Mono<Void> deleteBook(Integer id) {
        return bookReactiveRepository.deleteById(id)
                .then();
    }

    @Override
    public Flux<BooksByUserResponseDTO> getBooksByUsers(int id) {
        return bookReactiveRepository.getBooksByUser(id);
    }

    @Override
    public Mono<BookModel> updateBook(BookModel book) {
        return bookReactiveRepository.findById(book.id())
                .switchIfEmpty(Mono.error(new RuntimeException("Book not found")))
                .flatMap(existingBook -> {
                    BookEntity updatedBook = new BookEntity(
                            book.id(),
                            book.title(),
                            book.pages(),
                            book.isbn(),
                            book.publisher(),
                            (book.image() != null && book.image().length > 0)
                                    ? book.image()
                                    : existingBook.image(),
                            existingBook.dateAdded(),
                            book.resume()
                    );

                    return bookReactiveRepository.save(updatedBook);
                })
                .map(mapper::bookEntityToBookModel);

    }



}
