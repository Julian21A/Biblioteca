package co.edu.iudigital.library.infrastructure.entry_point.loan;

import co.edu.iudigital.library.infrastructure.entry_point.loan.properties.LoanProperties;
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
public class LoanRouterRest {

    private final LoanProperties route;

    @Bean
    public RouterFunction<ServerResponse> loanRouterFunction(LoanHandler handler) {
        return route()
                .PUT(route.buildRegisterLoan(), accept(MediaType.APPLICATION_JSON), handler::registerLoan)
                .build();
    }
}
