package co.edu.iudigital.library.infrastructure.entry_point.user.dto.request;

public record RegisterUserRequestDTO(String email,
                                     String name,
                                     String password,
                                     String role,
                                     String documentNumber) {
}
