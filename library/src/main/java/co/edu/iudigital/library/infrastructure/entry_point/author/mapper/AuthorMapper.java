package co.edu.iudigital.library.infrastructure.entry_point.author.mapper;

import co.edu.iudigital.library.domain.model.author.AuthorModel;
import co.edu.iudigital.library.infrastructure.entry_point.author.dto.AuthorRequestDTO;
import co.edu.iudigital.library.infrastructure.entry_point.author.dto.AuthorResponseDTO;
import co.edu.iudigital.library.infrastructure.entry_point.author.dto.AuthorUpdateRequestDTO;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface AuthorMapper {

    AuthorMapper INSTANCE = Mappers.getMapper(AuthorMapper.class);

    @Mapping(target = "id", ignore = true)
    AuthorModel authorRequestDTOToAuthor(AuthorRequestDTO authorRequestDTO);

    AuthorModel authorRequestDToToAuthor(AuthorRequestDTO authorRequestDTO);

    AuthorResponseDTO authorToResponseDTO(AuthorModel author);

    AuthorModel authorUpdateRequestDTOToAuthor(AuthorUpdateRequestDTO authorUpdateRequestDTO);
}
