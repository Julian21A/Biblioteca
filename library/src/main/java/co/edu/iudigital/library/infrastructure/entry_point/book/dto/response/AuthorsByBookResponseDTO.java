package co.edu.iudigital.library.infrastructure.entry_point.book.dto.response;

import co.edu.iudigital.library.domain.model.book.AuthorsByBook;

import java.util.List;

public record AuthorsByBookResponseDTO(Integer id,
                                       String title,
                                       int pages,
                                       String isbn,
                                       String publisher,
                                       List<AuthorsByBook> authors,
                                       Boolean isAvailable) {
}
