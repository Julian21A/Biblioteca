package co.edu.iudigital.library.domain.model.book;

import java.util.List;

public record BooksAndAuthors(Integer id,
                              String title,
                              int pages,
                              String isbn,
                              String publisher,
                              List<Author> authors,
                              ) {
}
