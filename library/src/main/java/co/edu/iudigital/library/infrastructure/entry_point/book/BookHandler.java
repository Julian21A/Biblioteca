package co.edu.iudigital.library.infrastructure.entry_point.book;


import co.edu.iudigital.library.domain.model.book.gateway.BookGateway;
import co.edu.iudigital.library.domain.usecase.book.BookUseCase;

import co.edu.iudigital.library.infrastructure.entry_point.book.dto.request.RegisterBookRequestDTO;
import co.edu.iudigital.library.infrastructure.entry_point.book.dto.response.DetailBookAuthorResponseDTO;
import co.edu.iudigital.library.infrastructure.entry_point.book.mapper.BookMapper;
import co.edu.iudigital.library.infrastructure.entry_point.book.properties.BookProperties;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.http.codec.multipart.Part;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Objects;

@Component
@RequiredArgsConstructor
@Tag(name = "Book", description = "Operaciones relacionadas con los libros")
public class BookHandler {

    private final BookProperties route;
    private final BookUseCase bookUseCase;
    private final BookMapper mapper;
    private final BookGateway gateway;

    public Mono<ServerResponse> registerBook(ServerRequest request) {
        return request.multipartData()
                .flatMap(parts -> Mono.zip(
                        extractString(Objects.requireNonNull(parts.getFirst("title"), "The 'title' field is required")),
                        extractString(Objects.requireNonNull(parts.getFirst("pages"), "The 'pages' field is required"))
                                .map(Integer::parseInt),
                        extractString(Objects.requireNonNull(parts.getFirst("isbn"), "The 'isbn' field is required")),
                        extractString(Objects.requireNonNull(parts.getFirst("publisher"), "The 'publisher' field is required")),
                        extractBytes(Objects.requireNonNull(parts.getFirst("image"), "The 'image' field is required")),
                        extractString(Objects.requireNonNull(parts.getFirst("dateAdded"), "The 'dateAdd' field is required"))
                                .map(date ->{
                                    LocalDateTime localDateTime = Instant.parse(date).atZone(ZoneId.systemDefault()).toLocalDateTime();
                                    Timestamp timestamp = Timestamp.valueOf(localDateTime);
                                    return timestamp;
                                }),
                        extractString(Objects.requireNonNull(parts.getFirst("resume"), "The 'resume' field is required")),
                        extractString(Objects.requireNonNull(parts.getFirst("authorIds"), "The 'author' field is required"))
                ))
                .flatMap(tuple -> {
                    RegisterBookRequestDTO dto = new RegisterBookRequestDTO(
                            tuple.getT1(), tuple.getT2(), tuple.getT3(), tuple.getT4(), tuple.getT5(), tuple.getT6(), tuple.getT7(), tuple.getT8()
                    );

                    return bookUseCase.registerBook(mapper.registerBookRequestDTOToBookModel(dto));
                })
                .then(ServerResponse.ok().build());
    }


    private Mono<String> extractString(Part part) {
        return DataBufferUtils.join(part.content())
                .map(dataBuffer -> {
                    try {
                        byte[] bytes = new byte[dataBuffer.readableByteCount()];
                        dataBuffer.read(bytes);
                        return new String(bytes, StandardCharsets.UTF_8).trim();
                    } finally {
                        DataBufferUtils.release(dataBuffer);
                    }
                });
    }

    private Mono<byte[]> extractBytes(Part part) {
        return DataBufferUtils.join(part.content())
                .map(dataBuffer -> {
                    try {
                        byte[] bytes = new byte[dataBuffer.readableByteCount()];
                        dataBuffer.read(bytes);
                        return bytes;
                    } finally {
                        DataBufferUtils.release(dataBuffer);
                    }
                });
    }

    Mono<ServerResponse> searchAuthorBook(ServerRequest request) {
        return bookUseCase.searchAuthorByName(request.queryParam("fullName").orElse(""))
                .map(mapper::authorByBooksResponseDTO)
                .collectList()
                .flatMap(books -> ServerResponse.ok().bodyValue(books));
    }

    public Mono<ServerResponse> getDetailsBook(ServerRequest request) {
        return request.queryParam("id")
                .map(Integer::parseInt)
                .map(bookUseCase::getDetailBookAuthor)
                .orElse(Mono.error(new IllegalArgumentException("ID is required and must be an integer")))
                .flatMap(detailBook -> {
                    DetailBookAuthorResponseDTO responseDTO = mapper.detailBookAuthorModelToDetailBookAuthorResponseDTO(detailBook);

                    return ServerResponse.ok()
                            .contentType(MediaType.APPLICATION_JSON)
                            .bodyValue(responseDTO);
                });
    }


    public Mono<ServerResponse> getBookImage(ServerRequest request) {
        return request.queryParam("id")
                .map(Integer::parseInt)
                .map(bookUseCase::getDetailBookAuthor)
                .orElse(Mono.error(new IllegalArgumentException("ID is required and must be an integer")))
                .flatMap(detailBook -> {
                    byte[] image = detailBook.image() != null ? detailBook.image() : new byte[0];

                    return ServerResponse.ok()
                            .contentType(MediaType.IMAGE_JPEG)
                            .bodyValue(image);
                });
    }

    public Mono<ServerResponse> deleteBook(ServerRequest request) {
        return Mono.justOrEmpty(request.queryParam("id"))
                .map(Integer::parseInt)
                .flatMap(id -> bookUseCase.deleteBook(id).then(Mono.just(id))) // Asegurar flujo reactivo
                .then(ServerResponse.ok().build());
    }



}



