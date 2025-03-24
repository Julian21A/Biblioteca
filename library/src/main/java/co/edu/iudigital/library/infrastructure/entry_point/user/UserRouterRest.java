package co.edu.iudigital.library.infrastructure.entry_point.user;


import co.edu.iudigital.library.infrastructure.entry_point.author.AuthorHandler;
import co.edu.iudigital.library.infrastructure.entry_point.properties.RouteProperties;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.RouterOperation;
import org.springdoc.core.annotations.RouterOperations;
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
    @RouterOperations({
            @RouterOperation(path = "/product/api/v1/auth/userlogin", produces = {MediaType.APPLICATION_JSON_VALUE}, beanClass = UserHandler.class, beanMethod = "loginUser", operation = @Operation(operationId = "loginUser", responses = {
                    @ApiResponse(responseCode = "200", description = "Inicio de sesión exitoso"),
                    @ApiResponse(responseCode = "400", description = "Credenciales inválidas")
            })),
            @RouterOperation(path = "/product/api/v1/register/user", produces = {MediaType.APPLICATION_JSON_VALUE}, beanClass = UserHandler.class, beanMethod = "registerUser", operation = @Operation(operationId = "registerUser", responses = {
                    @ApiResponse(responseCode = "200", description = "Usuario registrado con éxito"),
                    @ApiResponse(responseCode = "400", description = "Solicitud incorrecta")
            }))
    })
    public RouterFunction<ServerResponse> routerFunction (UserHandler handler){
        return route()
                .POST(route.buildLogin(), accept(MediaType.APPLICATION_JSON), handler::loginUser)
                .POST(route.buildRegister(), accept(MediaType.APPLICATION_JSON), handler::registerUser)
                .build();
    }
}
