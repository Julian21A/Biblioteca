package co.edu.iudigital.library.domain.model.loan.gateway;

import co.edu.iudigital.library.domain.model.loan.LoanRegister;
import co.edu.iudigital.library.infrastructure.entry_point.loan.dto.request.RegisterLoanRequestDTO;
import reactor.core.publisher.Mono;

public interface LoanGateway {

    Mono<LoanRegister> loanRegister(LoanRegister loanRegister);
}
