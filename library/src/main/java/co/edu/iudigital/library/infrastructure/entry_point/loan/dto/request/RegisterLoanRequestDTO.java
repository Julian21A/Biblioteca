package co.edu.iudigital.library.infrastructure.entry_point.loan.dto.request;

import co.edu.iudigital.library.infrastructure.entry_point.loan.helper.StringToIntegerDeserializer;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;

public record RegisterLoanRequestDTO(  @Schema(description = "ID del libro", example = "1")
                                       //@JsonDeserialize(using = StringToIntegerDeserializer.class)
                                       Integer bookId,
                                       //@JsonDeserialize(using = StringToIntegerDeserializer.class)
                                       @Schema(description = "Número de documento del usuario", example = "123456789")
                                       Integer userId,
                                       @Schema(description = "Fecha de préstamo (yyyy-MM-dd)", example = "2024-03-15")
                                       @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd")
                                       LocalDate loanDate) { }
