package co.edu.iudigital.library.infrastructure.entry_point.user.mapper;

import co.edu.iudigital.library.domain.model.user.AuthResponse;
import co.edu.iudigital.library.domain.model.user.UserModel;
import co.edu.iudigital.library.infrastructure.entry_point.author.mapper.AuthorMapper;
import co.edu.iudigital.library.infrastructure.entry_point.user.dto.request.LoginUserRequestDTO;
import co.edu.iudigital.library.infrastructure.entry_point.user.dto.response.LoginUserResponseDTO;
import co.edu.iudigital.library.infrastructure.entry_point.user.dto.request.RegisterUserRequestDTO;
import co.edu.iudigital.library.infrastructure.entry_point.user.dto.response.RegisterUserResponseDTO;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface UserMapper {

    AuthorMapper INSTANCE = Mappers.getMapper(AuthorMapper.class);

    //@Mapping(target = "id", ignore = true)

    LoginUserResponseDTO userToLoginUserResponseDTO(UserModel userModel);

    UserModel loginUserRequestDTOToUserModel(LoginUserRequestDTO loginUserRequestDTO);

    default LoginUserResponseDTO authResponseToLoginUserResponseDTO(AuthResponse authResponse) {
        return new LoginUserResponseDTO(
                authResponse.user().id(),
                authResponse.user().name(),
                authResponse.user().role(),
                authResponse.user().documentNumber(),
                authResponse.token()// Aquí debes asignar el rol según tu lógica de negocio
        );
    }

    UserModel registerUserRequestDTOToUserModel(RegisterUserRequestDTO registerUserRequestDTO);
    RegisterUserResponseDTO UserModelToRegisterUserResponseDTO(UserModel userModel);
}
