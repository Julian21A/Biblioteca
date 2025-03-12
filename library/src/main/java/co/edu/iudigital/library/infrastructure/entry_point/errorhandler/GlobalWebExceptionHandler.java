package co.edu.iudigital.library.infrastructure.entry_point.errorhandler;

import co.edu.iudigital.library.infrastructure.entry_point.errorhandler.dto.CustomException;
import co.edu.iudigital.library.infrastructure.entry_point.errorhandler.dto.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebExceptionHandler;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;

@Slf4j
@Order(-2) // Asegura que este manejador se ejecute antes del predeterminado de WebFlux
@RestControllerAdvice
public class GlobalWebExceptionHandler implements WebExceptionHandler {

    @Override
    public Mono<Void> handle(ServerWebExchange exchange, Throwable ex) {
        log.error("Exception caught: {}", ex.getMessage(), ex);

        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        String code = "INTERNAL_SERVER_ERROR";
        String message = ex.getMessage();

        if (ex instanceof CustomException) {
            CustomException customEx = (CustomException) ex;
            status = customEx.getStatus();
            code = customEx.getErrorCode().getCode();
            message = customEx.getErrorCode().getMessage();
        }

        ErrorResponse errorResponse = ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .code(code)
                .message(message)
                .status(status.name())
                .build();

        exchange.getResponse().setStatusCode(status);
        exchange.getResponse().getHeaders().setContentType(MediaType.APPLICATION_JSON);

        String responseBody = "{\"timestamp\":\"" + errorResponse.getTimestamp() + "\","
                + "\"code\":\"" + errorResponse.getCode() + "\","
                + "\"message\":\"" + errorResponse.getMessage() + "\","
                + "\"status\":\"" + errorResponse.getStatus() + "\"}";

        byte[] bytes = responseBody.getBytes(StandardCharsets.UTF_8);
        return exchange.getResponse().writeWith(Mono.just(exchange.getResponse().bufferFactory().wrap(bytes)));
    }
}
