package co.edu.iudigital.library.domain.model.book;

import java.sql.Timestamp;

public record BookModel(Integer id,
                        String title,
                        Integer pages,
                        String isbn,
                        String publisher,
                        byte[] image,
                        Timestamp dateAdded,
                        String resume,
                        String authors) {
}
