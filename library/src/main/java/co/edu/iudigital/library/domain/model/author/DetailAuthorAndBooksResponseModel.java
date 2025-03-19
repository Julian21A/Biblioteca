package co.edu.iudigital.library.domain.model.author;

import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.author.dto.BookByAuthorEntity;

import java.util.List;

public record DetailAuthorAndBooksResponseModel(Integer id,
                                                String firstName,
                                                String lastName,
                                                String biography,
                                                byte[] image,
                                                List<BookByAuthorModel> books) {
}
