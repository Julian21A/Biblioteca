package co.edu.iudigital.library.infrastructure.entry_point.loan;

import co.edu.iudigital.library.domain.usecase.loan.LoanUseCase;
import co.edu.iudigital.library.infrastructure.entry_point.loan.dto.request.RegisterLoanRequestDTO;
import co.edu.iudigital.library.infrastructure.entry_point.loan.mapper.LoanMapper;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
@Tag(name = "Loan", description = "Operaciones relacionadas con prestamos de libros")
public class LoanHandler {
    private final LoanUseCase loanUseCase;
    private final LoanMapper mapper;

    public Mono<ServerResponse> registerLoan(ServerRequest request) {
        return request.bodyToMono(RegisterLoanRequestDTO.class)
                .flatMap(registerLoanRequestDTO ->
                        loanUseCase.registerLoan(mapper.toLoanRegister(registerLoanRequestDTO))
                )
                .then(ServerResponse.ok().build());
    }

}
