package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.author.repository;

import co.edu.iudigital.library.domain.model.author.AuthorModel;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.author.dto.AuthorEntity;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.author.dto.AuthorSearchEntity;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;


@Repository
public interface AuthorReactiveRepository extends ReactiveCrudRepository<AuthorEntity, Integer>{

    //Mono<AuthorEntity> findById(String id);

    @Query("""
SELECT a.id, a.first_name, a.last_name, COUNT(ab.id) AS book_count
FROM authors a
    LEFT JOIN authors_books ab ON a.id = ab.id_authors
WHERE LOWER(a.first_name) LIKE LOWER(CONCAT('%', :name, '%'))
   OR LOWER(a.last_name) LIKE LOWER(CONCAT('%', :name, '%'))
GROUP BY a.id
""")
    Flux<AuthorSearchEntity> searchByName(@Param("name") String name);
}
