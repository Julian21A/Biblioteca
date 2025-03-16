package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.repository;

import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.author.dto.AuthorEntity;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.dto.BookEntity;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface BookReactiveRepository extends ReactiveCrudRepository<BookEntity, Integer> {
}
