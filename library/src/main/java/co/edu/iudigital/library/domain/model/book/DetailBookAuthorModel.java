package co.edu.iudigital.library.domain.model.book;



import java.util.List;

public record DetailBookAuthorModel(Integer id,
                                    String title,
                                    Integer pages,
                                    String isbn,
                                    String publisher,
                                    List<AuthorsByBook> Authors,
                                    Boolean isAvailable,
                                    byte[] image,
                                    String resume) {
}
