package co.edu.iudigital.library.domain.model.author;

public record AuthorModel(int id,
                          String code,
                          String firstName,
                          String lastName,
                          String biography,
                          int librarianId,
                          byte[] image) {}
