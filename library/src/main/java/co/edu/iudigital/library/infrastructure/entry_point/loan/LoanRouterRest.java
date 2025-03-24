package co.edu.iudigital.library.infrastructure.entry_point.loan;

import co.edu.iudigital.library.infrastructure.entry_point.loan.properties.LoanProperties;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.RouterOperation;
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
    @RouterOperation(path = "/product/api/v1/loan/register", produces = {MediaType.APPLICATION_JSON_VALUE}, beanClass = LoanHandler.class, beanMethod = "registerLoan", operation = @Operation(operationId = "registerLoan", responses = {
            @ApiResponse(responseCode = "200", description = "Préstamo registrado con éxito"),
            @ApiResponse(responseCode = "400", description = "Solicitud incorrecta")
    }))
    public RouterFunction<ServerResponse> loanRouterFunction(LoanHandler handler) {
        return route()
                .POST(route.buildRegisterLoan(), accept(MediaType.APPLICATION_JSON), handler::registerLoan)
                .build();
    }
}
