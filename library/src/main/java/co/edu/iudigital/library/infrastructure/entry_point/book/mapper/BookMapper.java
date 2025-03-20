package co.edu.iudigital.library.infrastructure.entry_point.book.mapper;

import co.edu.iudigital.library.domain.model.book.BookModel;
import co.edu.iudigital.library.domain.model.book.BooksAndAuthorsModel;
import co.edu.iudigital.library.domain.model.book.DetailBookAuthorModel;
import co.edu.iudigital.library.infrastructure.entry_point.book.dto.response.AuthorsByBookResponseDTO;
import co.edu.iudigital.library.infrastructure.entry_point.book.dto.request.RegisterBookRequestDTO;
import co.edu.iudigital.library.infrastructure.entry_point.book.dto.response.DetailBookAuthorResponseDTO;
import org.mapstruct.*;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface BookMapper {


    BookModel registerBookRequestDTOToBookModel(RegisterBookRequestDTO registerBookRequestDTO);

    AuthorsByBookResponseDTO authorByBooksResponseDTO(BooksAndAuthorsModel booksAndAuthorsModel);

    DetailBookAuthorResponseDTO detailBookAuthorModelToDetailBookAuthorResponseDTO(DetailBookAuthorModel detailBookAuthorModel);

}
