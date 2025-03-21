package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.loan.repository;

import co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.loan.dto.LoanRegisterEntity;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface LoanReactiveRepository extends ReactiveCrudRepository<LoanRegisterEntity, Integer> {
}
