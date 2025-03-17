package co.edu.iudigital.library.infrastructure.entry_point.book.mapper;

import co.edu.iudigital.library.domain.model.book.BookModel;
import co.edu.iudigital.library.infrastructure.entry_point.book.dto.RegisterBookRequestDTO;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface BookMapper {


    BookModel registerBookRequestDTOToBookModel(RegisterBookRequestDTO registerBookRequestDTO);

}
