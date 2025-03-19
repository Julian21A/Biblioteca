package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.author.helper;

import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.author.dto.BookByAuthorEntity;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.r2dbc.postgresql.codec.Json;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.ReadingConverter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@ReadingConverter
public class JsonToBookByAuthorEntityConverter implements Converter<Json, List<BookByAuthorEntity>> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public List<BookByAuthorEntity> convert(Json source) {
        try {
            return objectMapper.readValue(source.asString(), new TypeReference<>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }
}
