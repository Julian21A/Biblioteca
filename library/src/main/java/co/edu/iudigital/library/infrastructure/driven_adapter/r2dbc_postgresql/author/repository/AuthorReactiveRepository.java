package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.author.repository;

import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.author.dto.AuthorEntity;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.author.dto.AuthorSearchEntity;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.author.dto.DetailAuthorAndBooksEntity;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface AuthorReactiveRepository extends ReactiveCrudRepository<AuthorEntity, Integer> {


    @Query("""
            SELECT a.id, a.first_name, a.last_name, COUNT(ab.id) AS book_count
            FROM authors a
                LEFT JOIN authors_books ab ON a.id = ab.id_authors
            WHERE LOWER(a.first_name) LIKE LOWER(CONCAT('%', :name, '%'))
               OR LOWER(a.last_name) LIKE LOWER(CONCAT('%', :name, '%'))
            GROUP BY a.id
            """)
    Flux<AuthorSearchEntity> searchByName(@Param("name") String name);

    @Query("""

            SELECT
                a.id,
                a.first_name,
                a.last_name,
                a.biography,
                a.image,
                COALESCE(books_data.books, '[]'::jsonb) AS books -- Lista de libros en JSONB
            FROM authors a
            LEFT JOIN (
                SELECT
                    unique_books.id_authors AS author_id,
                    jsonb_agg(
                        jsonb_build_object(
                            'id', unique_books.id,
                            'bookName', unique_books.title
                        )
                    ) AS books
                FROM (
                    SELECT DISTINCT ON (b.title) ab.id_authors, b.id, b.title
                    FROM authors_books ab
                    LEFT JOIN books b ON ab.book = b.id
                    ORDER BY b.title, b.id -- Asegura que se elige un solo libro por título
                ) AS unique_books
                GROUP BY unique_books.id_authors
            ) AS books_data ON a.id = books_data.author_id
            WHERE a.id = :author_id;


                    """)
    Mono<DetailAuthorAndBooksEntity> searchDetailAuthorById(@Param("idAuthor") Integer idAuthor);

}
