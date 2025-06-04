package co.edu.iudigital.library.infrastructure.entry_point.user.dto.request;

public record UpdatePasswordRequestDTO(int id,
                                       String newPassword,
                                       String oldPassword){
}
