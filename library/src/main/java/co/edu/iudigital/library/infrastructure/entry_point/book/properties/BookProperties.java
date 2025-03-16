package co.edu.iudigital.library.infrastructure.entry_point.book.properties;

import co.edu.iudigital.library.infrastructure.entry_point.author.properties.AuthorRouteProperties;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "entries.reactive-web")
public class BookProperties {
    private String baseUrl;
    private String author;
    private Book book;

    @Data
    public static class Book {
      private String create;
        //private String update;
        //private String search;
    }

    public String buildRegisterBook(){
        return baseUrl.concat(book.create);
    }
}
