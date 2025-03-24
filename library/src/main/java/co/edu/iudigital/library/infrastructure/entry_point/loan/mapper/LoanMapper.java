package co.edu.iudigital.library.infrastructure.entry_point.loan.mapper;

import co.edu.iudigital.library.domain.model.loan.LoanRegister;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.loan.dto.LoanRegisterEntity;
import co.edu.iudigital.library.infrastructure.entry_point.loan.dto.request.RegisterLoanRequestDTO;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface LoanMapper {


    LoanRegister toLoanRegister(RegisterLoanRequestDTO loanRegisterEntity);
}
