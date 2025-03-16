package co.edu.iudigital.library.infrastructure.entry_point.book;

import co.edu.iudigital.library.infrastructure.entry_point.author.AuthorHandler;
import co.edu.iudigital.library.infrastructure.entry_point.book.properties.BookProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RequestPredicates.accept;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@Configuration
@RequiredArgsConstructor
public class BookRouterRest {

    private final BookProperties route;

    @Bean
    public RouterFunction<ServerResponse> bookRouterFunction (AuthorHandler handler) {

        return route()
               .POST("/create", accept(MediaType.APPLICATION_JSON), handler::createAuthor)

                .build();
    }
}
