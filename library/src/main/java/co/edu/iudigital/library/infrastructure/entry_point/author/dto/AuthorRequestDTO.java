package co.edu.iudigital.library.infrastructure.entry_point.author.dto;


import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "DTO para la creación de un autor")
public record AuthorRequestDTO(
        @Schema(description = "Nombre del autor", example = "Gabriel")
        String firstName,

        @Schema(description = "Apellido del autor", example = "García Márquez")
        String lastName,

        @Schema(description = "Biografía del autor", example = "Escritor colombiano")
        String biography,

        @Schema(description = "ID del bibliotecario asociado", example = "1")
        int librarianId,

        @Schema(description = "Imagen del autor en bytes")
        byte[] image
) {}
