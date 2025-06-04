package co.edu.iudigital.library.infrastructure.entry_point.book.dto.response;

public record BooksByUserResponseDTO(int bookId,
                                     int loanId,
                                     String title) {
}
