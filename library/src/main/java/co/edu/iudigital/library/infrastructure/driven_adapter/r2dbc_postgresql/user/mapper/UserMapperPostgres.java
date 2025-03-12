package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.user.mapper;

import co.edu.iudigital.library.domain.model.user.UserModel;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.user.entity.LoginUserEntity;
import co.edu.iudigital.library.infrastructure.entry_point.author.mapper.AuthorMapper;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface UserMapperPostgres {
    AuthorMapper INSTANCE = Mappers.getMapper(AuthorMapper.class);

    //@Mapping(target = "id", ignore = true)

    LoginUserEntity userToUserEntity(UserModel userModel);

    UserModel userEntityToUserModel(LoginUserEntity loginUserEntity);

    default LoginUserEntity updateUserEntity(LoginUserEntity existingUser, UserModel updatedUser) {
        existingUser.setEmail(updatedUser.email() != null ? updatedUser.email() : existingUser.getEmail());
        existingUser.setName(updatedUser.name() != null ? updatedUser.name() : existingUser.getName());
        existingUser.setPassword(updatedUser.password() != null ? updatedUser.password() : existingUser.getPassword());
        existingUser.setRole(updatedUser.role() != null ? updatedUser.role() : existingUser.getRole());
        existingUser.setDocumentNumber(updatedUser.documentNumber() != null ? updatedUser.documentNumber() : existingUser.getDocumentNumber());
        return existingUser;
    }
}
