package co.edu.iudigital.library.infrastructure.entry_point.book;

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
    public RouterFunction<ServerResponse> bookRouterFunction (BookHandler handler) {

        return route()
                .POST(route.buildRegisterBook(), accept(MediaType.APPLICATION_JSON), handler::registerBook)
                .GET(route.buildSearchBook(), accept(MediaType.APPLICATION_JSON), handler::searchAuthorBook)
                .GET(route.buildDetailsBook(), accept(MediaType.APPLICATION_JSON), handler::getDetailsBook)
                .build();
    }
}
