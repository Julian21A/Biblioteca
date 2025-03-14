package co.edu.iudigital.library.infrastructure.entry_point.author.dto;

public record AuthorUpdateRequestDTO(int id,
                                     String firstName,
                                     String lastName,
                                     int librarianId) {
}
