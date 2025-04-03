package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.security.jwt.filter;

import co.edu.iudigital.library.infrastructure.entry_point.errorhandler.dto.CustomException;
import co.edu.iudigital.library.infrastructure.entry_point.errorhandler.dto.ErrorCode;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import java.util.List;

@Component
public class JwtFilter implements WebFilter {

    private static final List<String> PUBLIC_ENDPOINTS = List.of("/auth", "/public", "/register", "/book", "/swagger-ui", "/v3/api-docs", "/favicon.ico", "/user");

    @Override
    public @NonNull Mono<Void> filter(ServerWebExchange exchange, @NonNull WebFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String path = request.getPath().value();

        boolean isPublicEndpoint = PUBLIC_ENDPOINTS.stream().anyMatch(path::contains);

        if (isPublicEndpoint) {
            return chain.filter(exchange);
        }

        String authHeader = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return Mono.error(new CustomException(ErrorCode.TOKEN_INVALID));
        }

        String token = authHeader.substring(7);
        exchange.getAttributes().put("token", token);

        return chain.filter(exchange);
    }
}
