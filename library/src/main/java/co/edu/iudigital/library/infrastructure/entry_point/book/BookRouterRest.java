package co.edu.iudigital.library.infrastructure.entry_point.book;

import co.edu.iudigital.library.infrastructure.entry_point.book.properties.BookProperties;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.RouterOperation;
import org.springdoc.core.annotations.RouterOperations;
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
    @RouterOperations({
            @RouterOperation(path = "/product/api/v1/book/create", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE} ,produces = {MediaType.APPLICATION_JSON_VALUE}, beanClass = BookHandler.class, beanMethod = "registerBook", operation = @Operation(operationId = "registerBook", responses = {
                    @ApiResponse(responseCode = "200", description = "Libro creado con éxito"),
                    @ApiResponse(responseCode = "400", description = "Solicitud incorrecta")
            })),
            @RouterOperation(path = "/product/api/v1/book/search", produces = {MediaType.APPLICATION_JSON_VALUE}, beanClass = BookHandler.class, beanMethod = "searchAuthorBook", operation = @Operation(operationId = "searchAuthorBook", responses = {
                    @ApiResponse(responseCode = "200", description = "Lista de libros encontrados")
            }, parameters = {
                    @Parameter(name = "fullName", in = io.swagger.v3.oas.annotations.enums.ParameterIn.QUERY, required = false, description = "Nombre completo del autor a buscar")
            })),
            @RouterOperation(path = "/product/api/v1/book/detail", produces = {MediaType.APPLICATION_JSON_VALUE}, beanClass = BookHandler.class, beanMethod = "getDetailsBook", operation = @Operation(operationId = "getDetailsBook", responses = {
                    @ApiResponse(responseCode = "200", description = "Detalles del libro"),
                    @ApiResponse(responseCode = "400", description = "ID inválido")
            }, parameters = {
                    @Parameter(name = "id", in = io.swagger.v3.oas.annotations.enums.ParameterIn.QUERY, required = true, description = "ID del libro a obtener")
            })),
            @RouterOperation(path = "/product/api/v1/book/detail/image", produces = {MediaType.IMAGE_JPEG_VALUE}, beanClass = BookHandler.class, beanMethod = "getBookImage", operation = @Operation(operationId = "getBookImage", responses = {
                    @ApiResponse(responseCode = "200", description = "Imagen del libro"),
                    @ApiResponse(responseCode = "404", description = "Imagen no encontrada")
            }, parameters = {
                    @Parameter(name = "id", in = io.swagger.v3.oas.annotations.enums.ParameterIn.QUERY, required = true, description = "ID del libro para obtener la imagen")
            }))
    })
    public RouterFunction<ServerResponse> bookRouterFunction (BookHandler handler) {

        return route()
                .POST(route.buildRegisterBook(), accept(MediaType.APPLICATION_JSON), handler::registerBook)
                .GET(route.buildSearchBook(), accept(MediaType.APPLICATION_JSON), handler::searchAuthorBook)
                .GET(route.buildDetailsBook(), accept(MediaType.APPLICATION_JSON), handler::getDetailsBook)
                .GET(route.buildDetailsBook()   + "/image", accept(MediaType.APPLICATION_JSON), handler::getBookImage)
                .DELETE("product/api/v1/book/delete", accept(MediaType.APPLICATION_JSON), handler::deleteBook)
                .build();
    }
}
