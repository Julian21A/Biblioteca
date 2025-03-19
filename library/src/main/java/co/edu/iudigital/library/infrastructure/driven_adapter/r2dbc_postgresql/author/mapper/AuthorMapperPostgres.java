package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.author.mapper;

import co.edu.iudigital.library.domain.model.author.AuthorModel;
import co.edu.iudigital.library.domain.model.author.AuthorSearchModel;
import co.edu.iudigital.library.domain.model.author.DetailAuthorAndBooksResponseModel;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.author.dto.AuthorEntity;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.author.dto.AuthorSearchEntity;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.author.dto.DetailAuthorAndBooksEntity;
import co.edu.iudigital.library.infrastructure.entry_point.author.mapper.AuthorMapper;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        injectionStrategy = InjectionStrategy.CONSTRUCTOR)

public interface AuthorMapperPostgres {
    AuthorMapper INSTANCE = Mappers.getMapper(AuthorMapper.class);

    //@Mapping(target = "id", ignore = true)
    AuthorEntity authorToAuthorEntity(AuthorModel author);

    AuthorModel authorEntityToAuthor(AuthorEntity authorEntity);

    AuthorSearchModel authorEntitySearchToAuthorSearchModel(AuthorSearchEntity authorEntity);

    DetailAuthorAndBooksResponseModel detailAuthorAndBooksResponseModelToDetailAuthorAndBooksResponseModel(
            DetailAuthorAndBooksEntity detailAuthorAndBooksEntity);
}
