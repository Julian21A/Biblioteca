package co.edu.iudigital.library.domain.model.user.gateway;

import co.edu.iudigital.library.domain.model.user.UserModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface UserGateway {

    Mono<UserModel> findUserByEmail(String email);
    String generateToken(UserModel userModel);
    Mono<UserModel> registerUser(UserModel userModel);
    Flux<UserModel> searchUsers(String name);
}
