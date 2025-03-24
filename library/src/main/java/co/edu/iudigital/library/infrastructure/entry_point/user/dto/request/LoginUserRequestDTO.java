package co.edu.iudigital.library.infrastructure.entry_point.user.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record LoginUserRequestDTO(@Schema(description = "Correo electrónico del usuario", example = "usuario@ejemplo.com")
                                   String email,
                                  @Schema(description = "Contraseña del usuario", example = "contraseña123")
                                   String password) {}
