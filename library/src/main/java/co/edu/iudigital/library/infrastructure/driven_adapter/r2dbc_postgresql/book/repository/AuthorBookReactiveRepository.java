package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.repository;

import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.dto.AuthorBookEntity;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.dto.BooksByAuthorEntity;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface AuthorBookReactiveRepository extends ReactiveCrudRepository<AuthorBookEntity, Integer> {

    @Query("""
        SELECT
            b.id id,
            b.title book_name
        FROM
            public.authors_books AS ab
        JOIN
            public.books AS b ON ab.book = b.id
        WHERE
            ab.id_authors = :authorId
        ORDER BY
            b.title
        """)
    Flux<BooksByAuthorEntity> findBooksInfoByAuthorId(@Param("authorId") Integer authorId);
}
