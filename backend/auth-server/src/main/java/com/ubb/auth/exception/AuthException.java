package com.ubb.auth.exception;

import java.io.Serial;

public class AuthException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 4263332287857743740L;

    public AuthException(String message) {
        super(message);
    }

}
