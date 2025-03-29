package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.security.config;


import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.security.jwt.filter.JwtFilter;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.security.jwt.repository.JwtSecurityContextRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtSecurityContextRepository securityContextRepository;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityWebFilterChain filterChain(ServerHttpSecurity http, JwtFilter jwtFilter) {
        return http
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .cors(corsSpec -> corsSpec.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of("http://localhost:3000")); //  Permitir origen del frontend
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    config.setAllowedHeaders(List.of("*"));
                    config.setAllowCredentials(true);
                    return config;
                }))
                .securityContextRepository(securityContextRepository)
                .authorizeExchange(exchangeSpec -> exchangeSpec
                        .pathMatchers("/product/api/v1/auth/**").permitAll()
                        .pathMatchers("/product/api/v1/user").permitAll()
                        .pathMatchers("/product/api/v1/register/**").permitAll()
                        .pathMatchers("/product/api/v1/author/**").permitAll()
                        .pathMatchers("/product/api/v1/book/**").permitAll()
                        .pathMatchers("/product/api/v1/swagger-ui.html").permitAll()
                        .pathMatchers("/webjars/swagger-ui/index.html").permitAll()
                        .pathMatchers("/webjars/**", "/swagger-ui/**", "/v3/api-docs/**","/favicon.ico").permitAll()


                        .pathMatchers("/swagger-ui.html").permitAll()
                        .anyExchange().authenticated())
                .addFilterAfter(jwtFilter, SecurityWebFiltersOrder.FIRST)
                .httpBasic(ServerHttpSecurity.HttpBasicSpec::disable)
                .formLogin(ServerHttpSecurity.FormLoginSpec::disable)
                .logout(ServerHttpSecurity.LogoutSpec::disable)
                .build();
    }
}
