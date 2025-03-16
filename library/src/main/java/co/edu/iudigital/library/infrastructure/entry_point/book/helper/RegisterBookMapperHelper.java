package co.edu.iudigital.library.infrastructure.entry_point.book.helper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RegisterBookMapperHelper {
    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<Integer> parseAuthorIds(String json) {
        try {
            return objectMapper.readValue(json, new TypeReference<List<Integer>>() {});
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Invalid JSON format for author field", e);
        }
    }
}
