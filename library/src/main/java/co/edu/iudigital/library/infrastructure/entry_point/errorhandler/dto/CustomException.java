package co.edu.iudigital.library.infrastructure.entry_point.errorhandler.dto;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.io.Serializable;

@Getter
public class CustomException extends RuntimeException implements Serializable {

    private static final long serialVersionUID = 1L; // Para serialización
    private final ErrorCode errorCode;
    private final HttpStatus status;

    public CustomException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
        this.status = errorCode.getStatus();
    }

    public CustomException(ErrorCode errorCode, String customMessage) {
        super(customMessage);
        this.errorCode = errorCode;
        this.status = errorCode.getStatus();
    }
}
