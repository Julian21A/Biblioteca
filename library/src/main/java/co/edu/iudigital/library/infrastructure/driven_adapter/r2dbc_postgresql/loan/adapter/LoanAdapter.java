package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.loan.adapter;


import co.edu.iudigital.library.domain.model.loan.LoanRegister;
import co.edu.iudigital.library.domain.model.loan.gateway.LoanGateway;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.loan.mapper.LoanMapperPostgres;
import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.loan.repository.LoanReactiveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
@RequiredArgsConstructor
public class LoanAdapter implements LoanGateway {

    private final LoanReactiveRepository loanReactiveRepository;
    private final LoanMapperPostgres mapper;

    @Override
    public Mono<LoanRegister> loanRegister(LoanRegister loanRegister) {

        return loanReactiveRepository.save(mapper.toEntity(loanRegister))
                .map(mapper::toLoanRegister);
    }




}
