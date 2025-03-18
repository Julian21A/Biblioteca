package co.edu.iudigital.library.infrastructure.entry_point.author;

import co.edu.iudigital.library.domain.model.author.AuthorModel;
import co.edu.iudigital.library.domain.usecase.author.AuthorUseCase;
import co.edu.iudigital.library.domain.usecase.book.BookUseCase;
import co.edu.iudigital.library.infrastructure.entry_point.author.dto.AuthorRequestDTO;
import co.edu.iudigital.library.infrastructure.entry_point.author.dto.AuthorUpdateRequestDTO;
import co.edu.iudigital.library.infrastructure.entry_point.author.dto.response.AuthorAndBooksResponseDTO;
import co.edu.iudigital.library.infrastructure.entry_point.author.dto.response.BookByAuthorResponseDTO;
import co.edu.iudigital.library.infrastructure.entry_point.author.mapper.AuthorMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.http.codec.multipart.Part;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuple2;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class AuthorHandler {

    private final AuthorUseCase authorUseCase;
    private final BookUseCase bookUseCase;
    private final AuthorMapper mapper;

    public Mono<ServerResponse> createAuthor(ServerRequest request) {
        return request.multipartData()
                .flatMap(parts -> Mono.zip(
                        extractString(Objects.requireNonNull(parts.getFirst("firstName"), "The 'name' field is required")),
                        extractString(Objects.requireNonNull(parts.getFirst("lastName"), "The 'lastName' field is required")),
                        extractString(Objects.requireNonNull(parts.getFirst("biography"), "The 'biography' field is required")),
                        extractString(Objects.requireNonNull(parts.getFirst("librarianId"), "The 'librarianId' field is required"))
                                .map(Integer::parseInt),
                        extractBytes(Objects.requireNonNull(parts.getFirst("image"), "The 'image' field is required"))
                ))
                .flatMap(tuple -> {
                    AuthorRequestDTO dto = new AuthorRequestDTO(
                            tuple.getT1(), tuple.getT2(), tuple.getT3(), tuple.getT4(), tuple.getT5()
                    );

                    return authorUseCase.createAuthor(mapper.authorRequestDTOToAuthor(dto));
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

    public Mono<ServerResponse> updateAuthor(ServerRequest request) {
        return request.multipartData()
                .flatMap(parts -> {
                    int authorId = Integer.parseInt(request.pathVariable("id"));

                    return Mono.zip(
                            extractString(Objects.requireNonNull(parts.getFirst("firstName"), "The 'name' field is required")),
                            extractString(Objects.requireNonNull(parts.getFirst("firstName"), "The 'firstName' field is required")),
                            extractString(Objects.requireNonNull(parts.getFirst("lastName"), "The 'lastName' field is required")),
                            extractString(Objects.requireNonNull(parts.getFirst("biography"), "The 'biography' field is required")),
                            extractString(Objects.requireNonNull(parts.getFirst("librarianId"),"The 'librarian' field is required"))
                                    .map(Integer::parseInt),
                            extractBytes(Objects.requireNonNull(parts.getFirst("image"), "The 'image' field is required")).defaultIfEmpty(new byte[0])
                    ).flatMap(tuple -> {
                        AuthorUpdateRequestDTO dto = new AuthorUpdateRequestDTO(
                                authorId,
                                tuple.getT2(),
                                tuple.getT3(),
                                tuple.getT4(),
                                tuple.getT5(),
                                tuple.getT6().length > 0 ? tuple.getT6() : null
                        );

                        return authorUseCase.updateAuthor(mapper.authorUpdateRequestDTOToAuthor(dto));
                    });
                })
                .flatMap(author -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(mapper.authorToResponseDTO(author)));
    }

    public Mono<ServerResponse> searchAuthors(ServerRequest request) {
        return Mono.justOrEmpty(request.queryParam("fullName")) // Obtiene el parámetro "fullName"
                .flatMapMany(authorUseCase::searchAuthors)
                .collectList()
                .map(authors -> authors.stream()
                        .map(mapper::authorsSearchModelToAuthorSearchResponseDTO)
                        .toList())
                .flatMap(authors -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(authors));
    }

    Mono<ServerResponse> getAuthors(ServerRequest request) {
        return authorUseCase.getAuthors()
                .collectList()
                .map(author -> author.stream()
                        .map(mapper::authorsToResponseDTO)
                                .toList())
                .flatMap(authors -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(authors));
    }


    public Mono<ServerResponse> getDetailAuthor(ServerRequest request) {
        return extractAuthorId(request)
                .flatMap(this::fetchAuthorAndBooks)
                .flatMap(this::buildMultipartResponse);
    }

    private Mono<Integer> extractAuthorId(ServerRequest request) {
        return request.queryParam("AuthorId")
                .map(Integer::parseInt)
                .map(Mono::just)
                .orElseGet(() -> Mono.error(new IllegalArgumentException("AuthorId is required")));
    }

    private Mono<Tuple2<AuthorModel, List<BookByAuthorResponseDTO>>> fetchAuthorAndBooks(Integer authorId) {
        return Mono.zip(
                authorUseCase.getAuthorById(authorId),
                bookUseCase.findAuthorById(authorId)
                        .map(mapper::BooksByAuthortoBookByAuthorResponseDTO)
                        .collectList()
        );
    }


    private Mono<ServerResponse> buildMultipartResponse(Tuple2<AuthorModel, List<BookByAuthorResponseDTO>> tuple) {
        AuthorModel author = tuple.getT1();
        List<BookByAuthorResponseDTO> books = tuple.getT2();

        AuthorAndBooksResponseDTO responseDTO = mapper.toAuthorAndBooksResponseDTO(author, books);
        MultipartBodyBuilder bodyBuilder = createMultipartBody(responseDTO, author.image());

        return ServerResponse.ok()
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .bodyValue(bodyBuilder.build());
    }

    private MultipartBodyBuilder createMultipartBody(AuthorAndBooksResponseDTO responseDTO, byte[] image) {
        MultipartBodyBuilder bodyBuilder = new MultipartBodyBuilder();

        // Agregar JSON como parte del multipart
        bodyBuilder.part("json", responseDTO)
                .header("Content-Disposition", "form-data; name=json")
                .header("Content-Type", MediaType.APPLICATION_JSON_VALUE);

        // Si la imagen no es nula ni vacía, enviarla como flujo de datos
        if (image != null && image.length > 0) {
            InputStreamResource imageResource = new InputStreamResource(new ByteArrayInputStream(image));
            String contentType = detectImageType(image);

            bodyBuilder.part("image", imageResource)
                    .header("Content-Disposition", "form-data; name=image; filename=\"image.jpg\"")
                    .header("Content-Type", contentType);
        }

        return bodyBuilder;
}
    private String detectImageType(byte[] image) {
        try (InputStream is = new ByteArrayInputStream(image)) {
            String contentType = URLConnection.guessContentTypeFromStream(is);
            return (contentType != null) ? contentType : MediaType.APPLICATION_OCTET_STREAM_VALUE;
        } catch (IOException e) {
            return MediaType.APPLICATION_OCTET_STREAM_VALUE;
        }
    }
}
