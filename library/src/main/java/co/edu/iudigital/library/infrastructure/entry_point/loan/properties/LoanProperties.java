package co.edu.iudigital.library.infrastructure.entry_point.loan.properties;


import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "entries.reactive-web")
public class LoanProperties {

    private String baseUrl;
    private String author;
    private String book;
    private Loan loan;

    @Data
    public static class Loan {
        private String create;
    }

    public String buildRegisterLoan(){
        return baseUrl.concat(loan.create);}
}
