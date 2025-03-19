package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.config;

import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.author.helper.JsonToBookByAuthorEntityConverter;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.book.helper.JsonToAuthorsByBookConverter;
import io.r2dbc.spi.ConnectionFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.r2dbc.config.AbstractR2dbcConfiguration;
import org.springframework.data.r2dbc.convert.R2dbcCustomConversions;

import java.util.List;

@Configuration
public class R2dbcConfig extends AbstractR2dbcConfiguration {

    @Override
    public ConnectionFactory connectionFactory() {
        return null;
    }

    @Bean
    public R2dbcCustomConversions r2dbcCustomConversions() {
        return new R2dbcCustomConversions(
                R2dbcCustomConversions.StoreConversions.NONE,
                List.of(new JsonToAuthorsByBookConverter(),
                        new JsonToBookByAuthorEntityConverter())
        );
    }
}
