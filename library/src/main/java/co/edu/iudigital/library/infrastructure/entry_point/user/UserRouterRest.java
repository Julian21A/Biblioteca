package co.edu.iudigital.library.infrastructure.entry_point.user;


import co.edu.iudigital.library.infrastructure.entry_point.author.AuthorHandler;
import co.edu.iudigital.library.infrastructure.entry_point.properties.RouteProperties;
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
public class UserRouterRest {

    private final RouteProperties route;

    @Bean
    public RouterFunction<ServerResponse> routerFunction (UserHandler handler){
        System.out.println("esta es la url"  +route.buildLogin());
        return route()
                .POST(route.buildLogin(), accept(MediaType.APPLICATION_JSON), handler::loginUser)
                .POST(route.buildRegister(), accept(MediaType.APPLICATION_JSON), handler::registerUser)
                .build();
    }
}
