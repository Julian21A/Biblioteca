package co.edu.iudigital.library.domain.usecase.user;



import co.edu.iudigital.library.domain.model.user.AuthResponse;
import co.edu.iudigital.library.domain.model.user.UserModel;
import co.edu.iudigital.library.domain.model.user.gateway.UserGateway;
import co.edu.iudigital.library.infrastructure.entry_point.errorhandler.dto.CustomException;
import co.edu.iudigital.library.infrastructure.entry_point.errorhandler.dto.ErrorCode;
import co.edu.iudigital.library.infrastructure.entry_point.user.dto.request.LoginUserRequestDTO;
import co.edu.iudigital.library.infrastructure.entry_point.user.dto.request.UpdatePasswordRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.password.PasswordEncoder;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@RequiredArgsConstructor
public class UserUseCase {

   private final UserGateway gateway;
    private final PasswordEncoder passwordEncoder;



    public Mono<AuthResponse> loginUser(LoginUserRequestDTO request) {
        return gateway.findUserByEmail(request.email())
                .switchIfEmpty(Mono.error(new CustomException(ErrorCode.USER_NOT_FOUND)))
                .flatMap(user ->
                        !passwordEncoder.matches(request.password(), user.password())
                                ? Mono.error(new CustomException(ErrorCode.USER_BAD_PASSWORD))
                                : Mono.just(new AuthResponse(gateway.generateToken(user), user))
                );
    }



    public Mono<UserModel> registerUser(UserModel user) {
        return gateway.findUserByEmail(user.email())
                .flatMap(existingUser -> Mono.error(new CustomException(ErrorCode.USER_REGISTERED)))
                .switchIfEmpty(Mono.defer(() -> {
                    String encryptedPassword = passwordEncoder.encode(user.password());
                    UserModel encryptedUser = new UserModel(
                            null,  // ID debe ser generado por la DB
                            user.email(),
                            user.name(),
                            encryptedPassword,
                            (user.role() != null && !user.role().isBlank()) ? user.role() : "USER",
                            user.documentNumber()
                    );
                    return gateway.registerUser(encryptedUser);
                }))
                .cast(UserModel.class)
                .onErrorResume(DuplicateKeyException.class,
                        ex -> Mono.error(new CustomException(ErrorCode.DOCUMENT_NUMBER_ALREADY_EXISTS))
                )
                .onErrorResume(DataIntegrityViolationException.class,
                        ex -> Mono.error(new CustomException(ErrorCode.DATABASE_ERROR))
                );

    }


    public Flux<UserModel> searchUsers(String name) {
        return gateway.searchUsers(name);
    }

    public Mono<UserModel> updateUser(UserModel user) {
        return gateway.getById(user.id())
                .switchIfEmpty(Mono.error(new CustomException(ErrorCode.USER_NOT_FOUND)))
                .flatMap(existInUser -> {
                    UserModel updatedUser = new UserModel(
                            user.id(),
                            user.email(),
                            user.name(),
                            existInUser.password(),
                            user.role(),
                            user.documentNumber()
                    );
                    return gateway.registerUser(updatedUser);
                });
    }

    public Mono<UserModel> updatePassword(UpdatePasswordRequestDTO user) {
        return gateway.getById(user.id())
                .switchIfEmpty(Mono.error(new CustomException(ErrorCode.USER_NOT_FOUND)))
                .flatMap(existingUser -> {

                    if (!passwordEncoder.matches(user.oldPassword(), existingUser.password())) {
                        return Mono.error(new CustomException(ErrorCode.USER_BAD_PASSWORD));
                    }

                    String encryptedPassword = passwordEncoder.encode(user.newPassword());

                    UserModel updatedUser = new UserModel(
                            existingUser.id(),
                            existingUser.email(),
                            existingUser.name(),
                            encryptedPassword,
                            existingUser.role(),
                            existingUser.documentNumber()
                    );

                    return gateway.registerUser(updatedUser);
                });
    }



}
