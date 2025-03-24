package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.loan.mapper;

import co.edu.iudigital.library.domain.model.loan.LoanRegister;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.loan.dto.LoanRegisterEntity;
import co.edu.iudigital.library.infrastructure.entry_point.author.mapper.AuthorMapper;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface LoanMapperPostgres {
    LoanMapperPostgres INSTANCE = Mappers.getMapper(LoanMapperPostgres.class);

    LoanRegisterEntity toEntity(LoanRegister loanRegister);
    LoanRegister toLoanRegister(LoanRegisterEntity loanRegisterEntity);
}
