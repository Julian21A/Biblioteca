package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.mapper;

import co.edu.iudigital.library.domain.model.book.BookModel;
import co.edu.iudigital.library.domain.model.book.BooksAndAuthorsModel;
import co.edu.iudigital.library.domain.model.book.BooksByAuthor;
import co.edu.iudigital.library.domain.model.book.DetailBookAuthorModel;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.dto.*;
import co.edu.iudigital.library.infrastructure.entry_point.author.mapper.AuthorMapper;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        injectionStrategy = InjectionStrategy.CONSTRUCTOR)

public interface BookMapperPostgres {
    AuthorMapper INSTANCE = Mappers.getMapper(AuthorMapper.class);


    BookEntity bookModelToBookEntity(BookModel bookModel);

    BookModel bookEntityToBookModel(BookEntity bookEntity);

    BooksByAuthor authorBookEntityToBooksByAuthor(BooksByAuthorEntity booksByAuthorEntity);

    BooksAndAuthorsModel booksAndAuthorsEntityToBooksAndAuthorsModel(BooksAndAuthorsEntity booksAndAuthorsEntity);

    DetailBookAuthorModel detailBookAuthorEntityToDetailBookAuthorModel(DetailBookAuthorEntity detailBookAuthorEntity);
}
