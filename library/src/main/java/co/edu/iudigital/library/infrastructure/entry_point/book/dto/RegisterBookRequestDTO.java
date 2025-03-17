package co.edu.iudigital.library.infrastructure.entry_point.book.dto;


import java.sql.Timestamp;
import java.util.List;

public record RegisterBookRequestDTO(String title,
                                     Integer pages,
                                     String isbn,
                                     String publisher,
                                     byte[] image,
                                     Timestamp dateAdded,
                                     String resume,
                                     String authors) {
}
