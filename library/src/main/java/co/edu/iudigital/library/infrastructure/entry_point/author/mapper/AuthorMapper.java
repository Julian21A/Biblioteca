package co.edu.iudigital.library.infrastructure.entry_point.author.mapper;

import co.edu.iudigital.library.domain.model.author.AuthorModel;
import co.edu.iudigital.library.domain.model.author.AuthorSearchModel;
import co.edu.iudigital.library.domain.model.author.DetailAuthorAndBooksResponseModel;
import co.edu.iudigital.library.domain.model.book.BooksByAuthor;
import co.edu.iudigital.library.infrastructure.entry_point.author.dto.AuthorRequestDTO;
import co.edu.iudigital.library.infrastructure.entry_point.author.dto.response.*;
import co.edu.iudigital.library.infrastructure.entry_point.author.dto.AuthorUpdateRequestDTO;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

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

    AuthorAndBooksResponseDTO toAuthorAndBooksResponseDTO(DetailAuthorAndBooksResponseModel detailAuthorAndBooksResponseModel);

}

