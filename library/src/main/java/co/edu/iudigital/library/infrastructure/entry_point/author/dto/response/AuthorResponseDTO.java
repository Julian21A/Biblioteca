package co.edu.iudigital.library.infrastructure.entry_point.author.dto.response;

public record AuthorResponseDTO(int id,
                                String firstName,
                                String lastName,
                                int librarianId,
                                byte[] image) {
}
