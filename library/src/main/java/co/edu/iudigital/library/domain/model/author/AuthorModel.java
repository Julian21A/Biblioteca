package co.edu.iudigital.library.domain.model.author;

public record AuthorModel(Integer id,
                          String firstName,
                          String lastName,
                          String biography,
                          int librarianId,
                          byte[] image) {}
