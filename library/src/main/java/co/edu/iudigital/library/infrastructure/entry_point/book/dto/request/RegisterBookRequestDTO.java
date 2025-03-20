package co.edu.iudigital.library.infrastructure.entry_point.book.dto.request;


import java.sql.Timestamp;

public record RegisterBookRequestDTO(String title,
                                     Integer pages,
                                     String isbn,
                                     String publisher,
                                     byte[] image,
                                     Timestamp dateAdded,
                                     String resume,
                                     String authors) {
}
