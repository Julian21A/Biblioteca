package co.edu.iudigital.library.infrastructure.entry_point.author.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record AuthorResponseDTO(
                                        int id,

                                @Schema(description = "Nombre del autor", example = "Gabriel")
                                        String firstName,

                                @Schema(description = "Apellido del autor", example = "García Márquez")
                                        String lastName,

                                @Schema(description = "ID del bibliotecario asociado", example = "1")
                                        int librarianId,

                                @Schema(description = "Imagen del autor en bytes")
                                        byte[] image) {
}
