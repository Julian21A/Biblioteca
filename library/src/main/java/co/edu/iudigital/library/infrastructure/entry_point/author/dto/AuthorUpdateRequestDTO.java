package co.edu.iudigital.library.infrastructure.entry_point.author.dto;

public record AuthorUpdateRequestDTO(int id,
                                     String code,
                                     String firstName,
                                     String lastName,
                                     int librarianId) {
}
