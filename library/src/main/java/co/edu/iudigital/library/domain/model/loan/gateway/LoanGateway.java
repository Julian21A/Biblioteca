package co.edu.iudigital.library.domain.model.loan.gateway;

import co.edu.iudigital.library.domain.model.loan.LoanRegister;
import reactor.core.publisher.Mono;

public interface LoanGateway {

    Mono<LoanRegister> loanRegister(LoanRegister loanRegister);
}
