package co.edu.iudigital.library.infrastructure.entry_point.author;

import co.edu.iudigital.library.infrastructure.entry_point.author.properties.AuthorRouteProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RequestPredicates.POST;
import static org.springframework.web.reactive.function.server.RequestPredicates.accept;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@Configuration
@RequiredArgsConstructor
public class AuthorRouterRest {

    private final AuthorRouteProperties route;

    @Bean
    public RouterFunction<ServerResponse> authorRouterFunction (AuthorHandler handler) {
        return route()
                .POST(route.buildCreateAuthor(), accept(MediaType.APPLICATION_JSON), handler::createAuthor)
                .PUT(route.buildUpdateAuthor(), accept(MediaType.APPLICATION_JSON), handler::updateAuthor)
                .build();
    }
}
