package co.edu.iudigital.library.infrastructure.entry_point.user;


import co.edu.iudigital.library.domain.usecase.user.UserUseCase;
import co.edu.iudigital.library.infrastructure.entry_point.user.dto.request.LoginUserRequestDTO;
import co.edu.iudigital.library.infrastructure.entry_point.user.dto.request.RegisterUserRequestDTO;
import co.edu.iudigital.library.infrastructure.entry_point.user.dto.request.UpdatePasswordRequestDTO;
import co.edu.iudigital.library.infrastructure.entry_point.user.dto.request.UpdateUserRequestDTO;
import co.edu.iudigital.library.infrastructure.entry_point.user.mapper.UserMapper;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
@Tag(name = "User", description = "Operaciones relacionadas con los login y creacion de usuarios")
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
        return request.bodyToMono(LoginUserRequestDTO.class)
                .flatMap(userUseCase::loginUser)
                .flatMap(loginResponse -> ServerResponse.ok()
                        .bodyValue(mapper.authResponseToLoginUserResponseDTO(loginResponse))
                );
    }

    Mono<ServerResponse> searchUsers(ServerRequest request) {
        return Mono.justOrEmpty(request.queryParam("name"))
                .flatMapMany(userUseCase::searchUsers)
                .collectList()
                .map(authors -> authors.stream()
                .map(mapper::UserModelToSearchUserResponseDTO)
                .toList())
                .flatMap(users -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(users));

    }

    Mono<ServerResponse> updateUser(ServerRequest request) {
        return request.bodyToMono(UpdateUserRequestDTO.class)
                .map(dto -> new UpdateUserRequestDTO(
                        Integer.parseInt(request.pathVariable("id")),
                        dto.email(),
                        dto.name(),
                        dto.role(),
                        dto.documentNumber()
                ))
                .map(mapper::updateUserRequestToUserModel)
                .flatMap(userUseCase::updateUser)
                .flatMap(updateResponse -> ServerResponse.ok()
                        .bodyValue(mapper.UserModelToRegisterUserResponseDTO(updateResponse)));
    }

    Mono<ServerResponse> updatePassword(ServerRequest request) {
        return request.bodyToMono(UpdatePasswordRequestDTO.class)
                .map(dto -> new UpdatePasswordRequestDTO(
                        Integer.parseInt(request.pathVariable("id")),
                        dto.newPassword(),
                        dto.oldPassword()
                ))
                .flatMap(userUseCase::updatePassword)
                .flatMap(updateResponse -> ServerResponse.ok().build());
    }

}
