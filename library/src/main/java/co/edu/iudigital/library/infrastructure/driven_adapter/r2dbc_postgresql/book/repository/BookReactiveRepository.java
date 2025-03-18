package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.repository;

import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.author.dto.AuthorEntity;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.dto.BookEntity;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.dto.BooksAndAuthorsEntity;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface BookReactiveRepository extends ReactiveCrudRepository<BookEntity, Integer> {


    @Query("""

SELECT
    b.id,
    b.title,
    b.pages,
    b.isbn,
    b.publisher,
    COALESCE(
        jsonb_agg(
            DISTINCT jsonb_build_object(
                'id', a.id,
                'firstName', a.first_name,
                'lastName', a.last_name
            )
        ) FILTER (WHERE a.id IS NOT NULL),
        '[]'::jsonb
    ) AS authors,  -- Ahora devuelve un jsonb
    COUNT(DISTINCT ab.book) AS availableBooks
FROM books b
LEFT JOIN authors_books ab ON b.id = ab.book
LEFT JOIN authors a ON ab.id_authors = a.id
WHERE b.title ILIKE '%' || :fullName || '%'
GROUP BY b.id, b.title, b.pages, b.isbn, b.publisher;



""")
    Flux<BooksAndAuthorsEntity> findAllAuthorsBooks(@Param("fullName") String fullName);

}
