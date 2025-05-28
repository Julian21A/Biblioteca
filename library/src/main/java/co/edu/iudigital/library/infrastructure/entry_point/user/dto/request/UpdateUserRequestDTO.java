package co.edu.iudigital.library.infrastructure.entry_point.user.dto.request;

public record UpdateUserRequestDTO(Integer id,
                                  String email,
                                  String name,
                                  String role,
                                  String documentNumber) {
}
