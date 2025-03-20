package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.dto;



import java.util.List;

public record BooksAndAuthorsEntity(Integer id,
                                    String title,
                                    Integer pages,
                                    String isbn,
                                    String publisher,
                                    List<AuthorsByBook> authors,
                                    Boolean isAvailable) {
}
