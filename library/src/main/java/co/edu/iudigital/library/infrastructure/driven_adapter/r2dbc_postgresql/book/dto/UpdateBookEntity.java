package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.dto;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;


@Table("books")
public record UpdateBookEntity(@Id Integer id,
                               String title,
                               Integer pages,
                               String isbn,
                               String publisher,
                               byte[] image,
                               String resume) {
}
