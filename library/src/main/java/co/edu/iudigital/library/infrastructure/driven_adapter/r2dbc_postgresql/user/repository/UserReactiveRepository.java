package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.user.repository;


import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.user.entity.LoginUserEntity;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface UserReactiveRepository extends ReactiveCrudRepository<LoginUserEntity, Integer> {

    Mono<LoginUserEntity> findByEmail(String email);

}
