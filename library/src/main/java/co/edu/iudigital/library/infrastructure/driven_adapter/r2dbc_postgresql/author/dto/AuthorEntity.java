package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.author.dto;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("authors")
public record AuthorEntity(@Id Integer id,
                           String firstName,
                           String lastName,
                           String biography,
                           int librarianId,
                           byte[] image) {}
