package co.edu.iudigital.library.infrastructure.entry_point.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "entries.reactive-web")
public class RouteProperties {

    private String baseUrl;
    private Author author;
    private User user;



    @Data
    public static class Author {
        private String create;
        private String update;
        private String search;
    }

    public String buildCreateAuthor(){
        return baseUrl.concat(author.create);
    }
    public String buildUpdateAuthor(){
        return baseUrl.concat(author.update);
    }
    public String buildSearchAuthor(){return baseUrl.concat(author.search);}

    @Data
    public static class User {
        private String login;
        private String register;
    }

    public String buildLogin(){
        return baseUrl.concat(user.login);
    }
    public String buildRegister(){
        return baseUrl.concat(user.register);
    }
}
