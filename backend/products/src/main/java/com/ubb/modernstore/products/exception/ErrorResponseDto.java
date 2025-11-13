package com.ubb.modernstore.products.exception;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ErrorResponseDto {

    private String timestamp;
    private Integer status;
    private String error;
    private String message;
    private String path;

}
