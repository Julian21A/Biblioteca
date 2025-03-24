package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.adapter;

import co.edu.iudigital.library.domain.model.book.BookModel;
import co.edu.iudigital.library.domain.model.book.BooksAndAuthorsModel;
import co.edu.iudigital.library.domain.model.book.BooksByAuthor;
import co.edu.iudigital.library.domain.model.book.DetailBookAuthorModel;
import co.edu.iudigital.library.domain.model.book.gateway.BookGateway;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.dto.AuthorBookEntity;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.mapper.BookMapperPostgres;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.repository.AuthorBookReactiveRepository;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.repository.BookReactiveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
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
                .then();// Asegura que la función retorne un Mono<Void>
    }

}
