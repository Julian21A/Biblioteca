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
      private String search;
      private String detail;
      private String delete;

    }

    public String buildRegisterBook(){
        return baseUrl.concat(book.create);
    }
    public String buildSearchBook(){return baseUrl.concat(book.search);}
    public String buildDetailsBook(){return baseUrl.concat(book.detail);}
    public String buildDeleteBook(){return baseUrl.concat(book.delete);}
}
