package co.edu.iudigital.library.infrastructure.entry_point.author;

import co.edu.iudigital.library.domain.usecase.author.AuthorUseCase;
import co.edu.iudigital.library.infrastructure.entry_point.author.dto.AuthorRequestDTO;
import co.edu.iudigital.library.infrastructure.entry_point.author.dto.AuthorUpdateRequestDTO;
import co.edu.iudigital.library.infrastructure.entry_point.author.mapper.AuthorMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class AuthorHandler {

    private final AuthorUseCase authorUseCase;
    private final AuthorMapper mapper;

    public Mono<ServerResponse> createAuthor(ServerRequest request) {
        return request.bodyToMono(AuthorRequestDTO.class)
                .flatMap(dto -> authorUseCase.createAuthor(
                        mapper.authorRequestDTOToAuthor(dto)
                ))
                .flatMap(author ->
                        ServerResponse.ok().bodyValue(mapper.authorToResponseDTO(author)));
    }

    public Mono<ServerResponse> updateAuthor(ServerRequest request) {
        return request.bodyToMono(AuthorUpdateRequestDTO.class)
                .flatMap(dto -> authorUseCase.updateAuthor(
                        mapper.authorUpdateRequestDTOToAuthor(dto)
                ))
                .flatMap(author -> ServerResponse.ok().bodyValue(mapper.authorToResponseDTO(author)));
    }


}
