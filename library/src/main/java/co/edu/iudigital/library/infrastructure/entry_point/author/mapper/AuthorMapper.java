package co.edu.iudigital.library.infrastructure.entry_point.author.mapper;

import co.edu.iudigital.library.domain.model.author.AuthorModel;
import co.edu.iudigital.library.domain.model.author.AuthorSearchModel;
import co.edu.iudigital.library.infrastructure.entry_point.author.dto.AuthorRequestDTO;
import co.edu.iudigital.library.infrastructure.entry_point.author.dto.response.AuthorResponseDTO;
import co.edu.iudigital.library.infrastructure.entry_point.author.dto.AuthorUpdateRequestDTO;
import co.edu.iudigital.library.infrastructure.entry_point.author.dto.response.AuthorSearchResponseDTO;
import co.edu.iudigital.library.infrastructure.entry_point.author.dto.response.AuthorsResponseDTO;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface AuthorMapper {

    @Mapping(target = "id", ignore = true)
    AuthorModel authorRequestDTOToAuthor(AuthorRequestDTO authorRequestDTO);

    AuthorResponseDTO authorToResponseDTO(AuthorModel author);

    AuthorModel authorUpdateRequestDTOToAuthor(AuthorUpdateRequestDTO authorUpdateRequestDTO);

    AuthorsResponseDTO authorsToResponseDTO(AuthorModel author);

    @Mapping(source = "bookCount", target = "count")
    AuthorSearchResponseDTO authorsSearchModelToAuthorSearchResponseDTO(AuthorSearchModel author);
}
