package co.edu.iudigital.library.domain.usecase.user;

import co.edu.iudigital.library.domain.model.user.UserModel;
import co.edu.iudigital.library.domain.model.user.gateway.UserGateway;
import co.edu.iudigital.library.infrastructure.entry_point.errorhandler.dto.CustomException;
import co.edu.iudigital.library.infrastructure.entry_point.errorhandler.dto.ErrorCode;
import co.edu.iudigital.library.infrastructure.entry_point.user.dto.request.LoginUserRequestDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import static org.mockito.Mockito.*;

class UserUseCaseTest {

    private UserGateway userGateway;
    private PasswordEncoder passwordEncoder;
    private UserUseCase userUseCase;

    @BeforeEach
    void setUp() {
        userGateway = mock(UserGateway.class);
        passwordEncoder = mock(PasswordEncoder.class);
        userUseCase = new UserUseCase(userGateway, passwordEncoder);
    }

    @Test
    void loginUser_shouldReturnAuthResponse_whenCredentialsAreValid() {
        // Arrange
        String email = "test@example.com";
        String password = "123456";
        UserModel user = new UserModel(1, email, "Test User", "hashed", "USER", "12345");
        String token = "mock-token";

        LoginUserRequestDTO request = new LoginUserRequestDTO(email, password);

        when(userGateway.findUserByEmail(email)).thenReturn(Mono.just(user));
        when(passwordEncoder.matches(password, user.password())).thenReturn(true);
        when(userGateway.generateToken(user)).thenReturn(token);

        // Act & Assert
        StepVerifier.create(userUseCase.loginUser(request))
                .expectNextMatches(auth -> auth.token().equals(token) && auth.user().equals(user))
                .verifyComplete();
    }

    @Test
    void loginUser_shouldReturnError_whenUserNotFound() {
        String email = "notfound@example.com";
        LoginUserRequestDTO request = new LoginUserRequestDTO(email, "any");

        when(userGateway.findUserByEmail(email)).thenReturn(Mono.empty());

        StepVerifier.create(userUseCase.loginUser(request))
                .expectErrorMatches(throwable ->
                        throwable instanceof CustomException &&
                                ((CustomException) throwable).getErrorCode() == ErrorCode.USER_NOT_FOUND
                ).verify();
    }

    @Test
    void loginUser_shouldReturnError_whenPasswordIsIncorrect() {
        String email = "user@example.com";
        String wrongPassword = "wrong";
        UserModel user = new UserModel(1, email, "Test User", "correctHash", "USER", "12345");

        LoginUserRequestDTO request = new LoginUserRequestDTO(email, wrongPassword);

        when(userGateway.findUserByEmail(email)).thenReturn(Mono.just(user));
        when(passwordEncoder.matches(wrongPassword, user.password())).thenReturn(false);

        StepVerifier.create(userUseCase.loginUser(request))
                .expectErrorMatches(throwable ->
                        throwable instanceof CustomException &&
                                ((CustomException) throwable).getErrorCode() == ErrorCode.USER_BAD_PASSWORD
                ).verify();
    }
}
