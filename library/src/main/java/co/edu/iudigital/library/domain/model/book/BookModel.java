package co.edu.iudigital.library.domain.model.book;

import java.util.List;

public record BookModel(Integer id,
                        String title,
                        Integer pages,
                        String isbn,
                        String publisher,
                        byte[] image,
                        String dateAdded,
                        String resume,
                        List<Integer> authors) {
}
