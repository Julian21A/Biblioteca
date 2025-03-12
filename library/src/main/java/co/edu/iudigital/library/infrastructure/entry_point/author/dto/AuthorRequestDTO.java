package co.edu.iudigital.library.infrastructure.entry_point.author.dto;

public record AuthorRequestDTO(String firstName,
                               String lastName,
                               String biography,
                               int librarianId,
                               byte[] image) {
}
