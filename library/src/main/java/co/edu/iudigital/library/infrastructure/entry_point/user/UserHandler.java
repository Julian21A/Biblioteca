package co.edu.iudigital.library.infrastructure.entry_point.user;


import co.edu.iudigital.library.domain.usecase.user.UserUseCase;
import co.edu.iudigital.library.infrastructure.entry_point.user.dto.request.LoginUserRequestDTO;
import co.edu.iudigital.library.infrastructure.entry_point.user.dto.request.RegisterUserRequestDTO;
import co.edu.iudigital.library.infrastructure.entry_point.user.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class UserHandler {

    private final UserUseCase userUseCase;
    private final UserMapper mapper;

    public Mono<ServerResponse> registerUser(ServerRequest request) {
        return request.bodyToMono(RegisterUserRequestDTO.class)
                .map(mapper::registerUserRequestDTOToUserModel)
                .flatMap(userUseCase::registerUser)
                .map(mapper::UserModelToRegisterUserResponseDTO)
                .flatMap(responseDTO -> ServerResponse.ok().bodyValue(responseDTO));
    }


    public Mono<ServerResponse> loginUser(ServerRequest request){
        System.out.println("este es el request a print" + request);
        return request.bodyToMono(LoginUserRequestDTO.class)
                .flatMap(userUseCase::loginUser)
                .flatMap(loginResponse -> ServerResponse.ok()
                        .bodyValue(mapper.authResponseToLoginUserResponseDTO(loginResponse))
                );
    }

}
