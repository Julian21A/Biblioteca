package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.security.jwt.manager;

import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.security.jwt.provider.JwtProvider;
import co.edu.iudigital.library.infrastructure.entry_point.errorhandler.dto.CustomException;
import co.edu.iudigital.library.infrastructure.entry_point.errorhandler.dto.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Component
public class JwtAuthenticationManager implements ReactiveAuthenticationManager {

    private final JwtProvider jwtProvider;

    @Override
    public Mono<Authentication> authenticate(Authentication authentication) {
        return Mono.just(authentication)
                .map(auth -> jwtProvider.getClaims(auth.getCredentials().toString()))
                .log()
                .onErrorResume(e ->
                        Mono.error(new CustomException(ErrorCode.TOKEN_EXPIRED)))
                .map(claims -> {
                    List<SimpleGrantedAuthority> authorities = extractAuthorities(claims);
                    return new UsernamePasswordAuthenticationToken(claims.getSubject(), null, authorities);
                });
    }

    private List<SimpleGrantedAuthority> extractAuthorities(Map<String, Object> claims) {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();

        Object rolesObj = claims.get("roles");

        if (rolesObj instanceof List<?> rolesList) {
            for (Object role : rolesList) {
                if (role instanceof Map<?, ?> roleMap) {
                    Object authorityObj = roleMap.get("authority");
                    if (authorityObj instanceof String authority) {
                        authorities.add(new SimpleGrantedAuthority(authority));
                    }
                }
            }
        }

        return authorities;
    }
}
