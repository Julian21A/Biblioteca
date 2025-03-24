package co.edu.iudigital.library.infrastructure.driven_adapter.r2dbc_postgresql.loan.dto;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDate;

@Table("loans")
public record LoanRegisterEntity( @Id Integer id,
                                   Integer userId,
                                   LocalDate loanDate,
                                   LocalDate returnDate,
                                  Integer bookId) {
}
