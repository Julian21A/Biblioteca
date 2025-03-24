package co.edu.iudigital.library.infrastructure.entry_point.author;

import co.edu.iudigital.library.infrastructure.entry_point.author.dto.response.AuthorResponseDTO;
import co.edu.iudigital.library.infrastructure.entry_point.author.properties.AuthorRouteProperties;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
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
public class AuthorRouterRest {

    private final AuthorRouteProperties route;

    @Bean
    @RouterOperations({
            @RouterOperation(path = "/product/api/v1/author/create",
                    consumes = { MediaType.MULTIPART_FORM_DATA_VALUE }, // Agregado
                    produces = { MediaType.APPLICATION_JSON_VALUE },
                    beanClass = AuthorHandler.class,
                    beanMethod = "createAuthor",
                    operation = @Operation(operationId = "createAuthor", responses = {
                            @ApiResponse(responseCode = "200", description = "Autor creado con éxito", content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = AuthorResponseDTO.class))),
                            @ApiResponse(responseCode = "400", description = "Solicitud incorrecta")
                    })),
            @RouterOperation(path = "/product/api/v1/author/update/{id}", produces = {
                    MediaType.APPLICATION_JSON_VALUE
            }, beanClass = AuthorHandler.class, beanMethod = "updateAuthor", operation = @Operation(operationId = "updateAuthor", responses = {
                    @ApiResponse(responseCode = "200", description = "Autor actualizado con éxito"),
                    @ApiResponse(responseCode = "404", description = "Autor no encontrado")
            }, parameters = {
                    @Parameter(name = "id", in = io.swagger.v3.oas.annotations.enums.ParameterIn.PATH, required = true, description = "ID del autor a actualizar")
            })),
            @RouterOperation(path = "/product/api/v1/author/search", produces = {
                    MediaType.APPLICATION_JSON_VALUE
            }, beanClass = AuthorHandler.class, beanMethod = "searchAuthors", operation = @Operation(operationId = "searchAuthors", responses = {
                    @ApiResponse(responseCode = "200", description = "Lista de autores encontrados")
            }, parameters = {
                    @Parameter(name = "fullName", in = io.swagger.v3.oas.annotations.enums.ParameterIn.QUERY, required = false, description = "Nombre completo del autor a buscar")
            })),
            @RouterOperation(path = "/product/api/v1/author/all", produces = {
                    MediaType.APPLICATION_JSON_VALUE
            }, beanClass = AuthorHandler.class, beanMethod = "getAuthors", operation = @Operation(operationId = "getAuthors", responses = {
                    @ApiResponse(responseCode = "200", description = "Lista de todos los autores")
            })),
            @RouterOperation(path = "/product/api/v1/author/detail", produces = {
                    MediaType.APPLICATION_JSON_VALUE
            }, beanClass = AuthorHandler.class, beanMethod = "getDetailAuthor", operation = @Operation(operationId = "getDetailAuthor", responses = {
                    @ApiResponse(responseCode = "200", description = "Detalles del autor"),
                    @ApiResponse(responseCode = "400", description = "ID inválido")
            }, parameters = {
                    @Parameter(name = "id", in = io.swagger.v3.oas.annotations.enums.ParameterIn.QUERY, required = true, description = "ID del autor a obtener")
            })),
            @RouterOperation(path = "/product/api/v1/author/detail/image", produces = {
                    MediaType.IMAGE_JPEG_VALUE
            }, beanClass = AuthorHandler.class, beanMethod = "getAuthorImage", operation = @Operation(operationId = "getAuthorImage", responses = {
                    @ApiResponse(responseCode = "200", description = "Imagen del autor"),
                    @ApiResponse(responseCode = "404", description = "Imagen no encontrada")
            }, parameters = {
                    @Parameter(name = "id", in = io.swagger.v3.oas.annotations.enums.ParameterIn.QUERY, required = true, description = "ID del autor para obtener la imagen")
            }))
    })
    public RouterFunction<ServerResponse> authorRouterFunction (AuthorHandler handler) {
        return route()
                .POST(route.buildCreateAuthor(), accept(MediaType.APPLICATION_JSON), handler::createAuthor)
                .PUT(route.buildUpdateAuthor(), accept(MediaType.APPLICATION_JSON), handler::updateAuthor)
                .GET(route.buildSearchAuthor(), accept(MediaType.APPLICATION_JSON), handler::searchAuthors)
                .GET(route.buildAllAuthors(), accept(MediaType.APPLICATION_JSON), handler::getAuthors)
                .GET(route.buildDetail(), accept(MediaType.APPLICATION_JSON), handler::getDetailAuthor)
                .GET(route.buildDetail() + "/image", accept(MediaType.APPLICATION_JSON), handler::getAuthorImage)
                .build();
    }
}
