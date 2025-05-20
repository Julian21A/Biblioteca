package co.edu.iudigital.library.infrastructure.entry_point.user.dto.response;

public record SearchUserResponseDTO(Integer id,
                                    String email,
                                    String name,
                                    String role,
                                    String documentNumber) {
}
