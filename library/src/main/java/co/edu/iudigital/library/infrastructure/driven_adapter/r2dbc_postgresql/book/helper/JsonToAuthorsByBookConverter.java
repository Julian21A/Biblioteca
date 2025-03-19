package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.helper;

import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.dto.AuthorsByBook;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.r2dbc.postgresql.codec.Json;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.ReadingConverter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@ReadingConverter
public class JsonToAuthorsByBookConverter implements Converter<Json, List<AuthorsByBook>> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public List<AuthorsByBook> convert(Json source) {
        try {
            return objectMapper.readValue(source.asString(), new TypeReference<>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }
}
