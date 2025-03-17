package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.dto;

import org.springframework.data.relational.core.mapping.Table;

@Table("authors_books")
public record BooksByAuthorEntity(Integer id,
                                  String bookName) {
}
