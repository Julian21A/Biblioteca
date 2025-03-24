package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.repository;

import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.dto.BookEntity;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.dto.BooksAndAuthorsEntity;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.dto.DetailBookAuthorEntity;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

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
    b.is_available
FROM books b
LEFT JOIN authors_books ab ON b.id = ab.book
LEFT JOIN authors a ON ab.id_authors = a.id
WHERE b.title ILIKE '%' || :fullName || '%'
GROUP BY b.id, b.title, b.pages, b.isbn, b.publisher;



""")
    Flux<BooksAndAuthorsEntity> findAllAuthorsBooks(@Param("fullName") String fullName);

    @Query("""
SELECT
    b.id,
    b.title,
    b.pages,
    b.isbn,
    b.publisher,
    b.image,
    b.resume,
    COALESCE(authors_data.authors, '[]'::jsonb) AS authors,  -- Lista de autores en JSONB
    b.is_available
FROM books b
LEFT JOIN (
    SELECT\s
        ab.book AS book_id,
        jsonb_agg(
            jsonb_build_object(
                'id', a.id,
                'firstName', a.first_name,
                'lastName', a.last_name
            )
        ) AS authors
    FROM authors_books ab
    LEFT JOIN authors a ON ab.id_authors = a.id
    GROUP BY ab.book
) AS authors_data ON b.id = authors_data.book_id
WHERE b.id = :bookId;
""")
    Mono<DetailBookAuthorEntity> findBookById(@Param("bookId") Integer bookId);
}
