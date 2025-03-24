package co.edu.iudigital.library.domain.model.loan;

import java.time.LocalDate;

public record LoanRegister(Integer id,
                           Integer userId,
                           LocalDate loanDate,
                           LocalDate returnDate,
                           Integer bookId) {
}
