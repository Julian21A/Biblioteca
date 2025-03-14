package co.edu.iudigital.library.infrastructure.entry_point.author;

import co.edu.iudigital.library.domain.usecase.author.AuthorUseCase;
import co.edu.iudigital.library.infrastructure.entry_point.author.dto.AuthorRequestDTO;
import co.edu.iudigital.library.infrastructure.entry_point.author.dto.AuthorUpdateRequestDTO;
import co.edu.iudigital.library.infrastructure.entry_point.author.mapper.AuthorMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.codec.multipart.Part;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class AuthorHandler {

    private final AuthorUseCase authorUseCase;
    private final AuthorMapper mapper;

    public Mono<ServerResponse> createAuthor(ServerRequest request) {
        return request.multipartData()
                .flatMap(parts -> Mono.zip(
                        extractString(Objects.requireNonNull(parts.getFirst("name"), "The 'name' field is required")),
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
        return request.bodyToMono(AuthorUpdateRequestDTO.class)
                .flatMap(dto -> authorUseCase.updateAuthor(mapper.authorUpdateRequestDTOToAuthor(dto)))
                .flatMap(author -> ServerResponse.ok().bodyValue(mapper.authorToResponseDTO(author)));
    }
}
