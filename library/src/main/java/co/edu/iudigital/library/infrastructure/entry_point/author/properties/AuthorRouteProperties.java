package co.edu.iudigital.library.infrastructure.entry_point.author.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "entries.reactive-web")
public class AuthorRouteProperties {
    private String baseUrl;
    private Author author;

    @Data
    public static class Author {
        private String create;
        private String update;
        private String search;
        private String allAuthors;
        private String detail;
    }

    public String buildCreateAuthor(){
        return baseUrl.concat(author.create);
    }
    public String buildUpdateAuthor(){
        return baseUrl.concat(author.update);
    }
    public String buildSearchAuthor(){return baseUrl.concat(author.search);}
    public String buildAllAuthors(){return baseUrl.concat(author.allAuthors);}
    public String buildDetail(){return baseUrl.concat(author.detail);}
}
