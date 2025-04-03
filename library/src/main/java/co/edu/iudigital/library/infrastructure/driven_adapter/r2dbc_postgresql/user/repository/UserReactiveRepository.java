package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.user.repository;


import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.user.entity.LoginUserEntity;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface UserReactiveRepository extends ReactiveCrudRepository<LoginUserEntity, Integer> {

    Mono<LoginUserEntity> findByEmail(String email);

    @Query("""
SELECT
    *
FROM public.users
WHERE name ILIKE '%' || :name || '%';
""")
    Flux<LoginUserEntity> findAllAUsersByName(@Param("name") String name);

}