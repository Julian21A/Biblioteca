package co.edu.iudigital.library.infrastructure.entry_point.book.dto.response;




import java.util.List;

public record DetailBookAuthorResponseDTO(Integer id,
                                          String title,
                                          Integer pages,
                                          String isbn,
                                          String publisher,
                                          List<AuthorsByBook> Authors,
                                          Boolean isAvailable,
                                          String resume) {
}
