package co.edu.iudigital.library.infrastructure.entry_point.author.dto.response;

import java.util.List;

public record AuthorAndBooksResponseDTO(Integer id,
                                        String firstName,
                                        String lastName,
                                        String biography,
                                        List<BookByAuthorResponseDTO> books) {
}
