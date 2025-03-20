package co.edu.iudigital.library.infrastructure.entry_point.user.dto.response;

public record LoginUserResponseDTO(int id,
                                   String name,
                                   String role,
                                   String documentNumber,
                                   String token) {
}
