package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.dto;

import co.edu.iudigital.library.domain.model.book.AuthorsByBook;

import java.util.List;

public record BooksAndAuthorsModel(Integer id,
                                   String title,
                                   int pages,
                                   String isbn,
                                   String publisher,
                                   List<AuthorsByBook> authors,
                                   int availableBooks) {
}
