package co.edu.iudigital.library.domain.model.book;

import java.util.List;

public record BooksAndAuthorsModel(Integer id,
                                   String title,
                                   int pages,
                                   String isbn,
                                   String publisher,
                                   List<AuthorsByBook> authors,
                                   Boolean isAvailable) {
}
