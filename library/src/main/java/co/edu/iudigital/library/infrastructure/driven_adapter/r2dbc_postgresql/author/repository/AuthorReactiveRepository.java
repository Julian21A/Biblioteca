package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.author.repository;

import co.edu.iudigital.library.domain.model.author.AuthorModel;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.author.dto.AuthorEntity;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;


@Repository
public interface AuthorReactiveRepository extends ReactiveCrudRepository<AuthorEntity, Integer>{

    //Mono<AuthorEntity> findById(String id);

    @Query("""
SELECT * FROM authors
         WHERE
             LOWER(first_name) LIKE LOWER(CONCAT('%', :name, '%'))
            OR LOWER(last_name) LIKE LOWER(CONCAT('%', :name, '%'))
            """)
    Flux<AuthorModel> searchByName(@Param("name") String name);


}
