package co.edu.iudigital.library.infrastructure.entry_point.book.dto;

import co.edu.iudigital.library.domain.model.book.AuthorsByBook;

import java.util.List;

public record BooksByBookResponseDTO(Integer id,
                                     String title,
                                     int pages,
                                     String isbn,
                                     String publisher,
                                     List<AuthorsByBook> authors,
                                     int availableBooks) {
}
