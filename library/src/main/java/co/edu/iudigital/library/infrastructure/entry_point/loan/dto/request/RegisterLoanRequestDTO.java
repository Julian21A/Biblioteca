package co.edu.iudigital.library.infrastructure.entry_point.loan.dto.request;

import java.time.LocalDate;

public record RegisterLoanRequestDTO(Integer id,
                                     String documentNumber,
                                     LocalDate loanDate) { }
