package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.repository;

import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.dto.AuthorBookEntity;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorBookReactiveRepository extends ReactiveCrudRepository<AuthorBookEntity, Integer> {
}
