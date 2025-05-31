package co.edu.iudigital.library.domain.usecase.loan;

import co.edu.iudigital.library.domain.model.loan.LoanRegister;
import co.edu.iudigital.library.domain.model.loan.gateway.LoanGateway;
import co.edu.iudigital.library.infrastructure.entry_point.loan.dto.request.RegisterLoanRequestDTO;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

import java.time.LocalDate;

@RequiredArgsConstructor
public class LoanUseCase {
    private final LoanGateway loanGateway;

    public Mono<LoanRegister> registerLoan(LoanRegister loanRegister) {
        return loanGateway.loanRegister(loanRegister);
    }

    public Mono<LoanRegister> updateReturnDate(int id) {
        return loanGateway.findById(id)
                .filter(loan -> loan.returnDate() == null)
                .flatMap(loan -> {
                    LoanRegister actualizado = new LoanRegister(
                            loan.id(),
                            loan.userId(),
                            loan.loanDate(),
                            LocalDate.now(),
                            loan.bookId()
                    );
                    return loanGateway.loanRegister(actualizado);
                });
    }

}
