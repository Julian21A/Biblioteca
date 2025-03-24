package co.edu.iudigital.library.infrastructure.entry_point.loan.helper;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;

public class StringToIntegerDeserializer extends JsonDeserializer<Integer> {
    @Override
    public Integer deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        try {
            return Integer.parseInt(p.getText());
        } catch (NumberFormatException e) {
            return null;
        }
    }
}

