package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.user.adapter;

import co.edu.iudigital.library.domain.model.user.UserModel;
import co.edu.iudigital.library.domain.model.user.gateway.UserGateway;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.security.jwt.provider.JwtProvider;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.user.mapper.UserMapperPostgres;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.user.repository.UserReactiveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
@RequiredArgsConstructor
public class UserAdapter implements UserGateway {

    private final UserReactiveRepository userReactiveRepository;
    private final UserMapperPostgres mapper;
    private final JwtProvider jwtProvider;

    @Override
    public Mono<UserModel> findUserByEmail(String email) {
        return userReactiveRepository.findByEmail(email)
                .map(mapper::userEntityToUserModel)
                ;
    }

    @Override
    public String generateToken(UserModel userModel) {
        return jwtProvider.generateToken(mapper.userToUserEntity(userModel));
    }

    @Override
    public Mono<UserModel> registerUser(UserModel userModel) {
        return userReactiveRepository.save(
                mapper.userToUserEntity(userModel))
                .map(mapper::userEntityToUserModel);
    }
}
