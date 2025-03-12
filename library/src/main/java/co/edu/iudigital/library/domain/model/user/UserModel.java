package co.edu.iudigital.library.domain.model.user;

public record UserModel(Integer id,
                        String email,
                        String name,
                        String password,
                        String role,
                        String documentNumber) {}
