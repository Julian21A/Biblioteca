package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.author.dto;

import org.springframework.data.annotation.Id;

import java.util.List;

public record DetailAuthorAndBooksEntity(@Id Integer id,
                                         String firstName,
                                         String lastName,
                                         String biography,
                                         byte[] image,
                                         List<BookByAuthorEntity> books) {
}
