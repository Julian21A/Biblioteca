package co.edu.iudigital.library.domain.model.author;

public record AuthorSearchModel(Integer id,
                                String firstName,
                                String lastName,
                                Integer bookCount) {
}
