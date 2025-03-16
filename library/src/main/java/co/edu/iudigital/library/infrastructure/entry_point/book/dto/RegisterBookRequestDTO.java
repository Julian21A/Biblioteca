package co.edu.iudigital.library.infrastructure.entry_point.book.dto;

import java.util.List;

public record RegisterBookRequestDTO(String title,
                                     Integer pages,
                                     String isbn,
                                     String publisher,
                                     byte[] image,
                                     String dateAdded,
                                     String resume,
                                     List<Integer> authors) {
}
