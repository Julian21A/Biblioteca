package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.author.repository;

import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.author.dto.AuthorEntity;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface AuthorReactiveRepository extends ReactiveCrudRepository<AuthorEntity, Integer>{

    Mono<AuthorEntity> findById(String id);
}
