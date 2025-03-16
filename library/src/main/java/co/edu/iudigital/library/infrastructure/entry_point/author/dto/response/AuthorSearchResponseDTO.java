package co.edu.iudigital.library.infrastructure.entry_point.author.dto.response;

public record AuthorSearchResponseDTO(int id,
                                      String firstName,
                                      String lastName,
                                      Integer count) {
}
