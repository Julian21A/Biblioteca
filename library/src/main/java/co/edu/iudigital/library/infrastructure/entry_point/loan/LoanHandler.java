package co.edu.iudigital.library.infrastructure.entry_point.loan;

import co.edu.iudigital.library.domain.usecase.loan.LoanUseCase;
import co.edu.iudigital.library.infrastructure.entry_point.loan.dto.request.RegisterLoanRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class LoanHandler {
    private final LoanUseCase loanUseCase;

    public Mono<ServerResponse> registerLoan(ServerRequest request){
        return request.bodyToMono(RegisterLoanRequestDTO.class)
                .map(loanUseCase::registerLoan)
                .then(ServerResponse.ok().build());
    }
}
