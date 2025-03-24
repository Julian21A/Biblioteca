package co.edu.iudigital.library.infrastructure.entry_point.book.dto.request;


import io.swagger.v3.oas.annotations.media.Schema;

import java.sql.Timestamp;

public record RegisterBookRequestDTO(@Schema(description = "Título del libro", example = "Cien años de soledad")
                                     String title,
                                     @Schema(description = "Número de páginas", example = "496")
                                     Integer pages,
                                     @Schema(description = "ISBN", example = "978-0-06-112008-4")
                                     String isbn,
                                     @Schema(description = "Editorial", example = "HarperCollins")
                                     String publisher,
                                     @Schema(description = "Imagen del libro en bytes")
                                     byte[] image,
                                     @Schema(description = "Fecha de adición", example = "2024-03-15T10:00:00Z")
                                     Timestamp dateAdded,
                                     @Schema(description = "Resumen del libro", example = "La historia de la familia Buendía...")
                                     String resume,
                                     @Schema(description = "IDs de los autores (separados por comas)", example = "1,2,3")
                                     String authors) {
}
