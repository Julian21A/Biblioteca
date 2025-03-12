package co.edu.iudigital.library.domain.model.user;



public record AuthResponse(String token,
                           UserModel user) {}
