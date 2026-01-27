package com.ubb.auth.exception;

import java.io.Serial;

public class EntityNotFoundException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 501577515439282245L;

    public EntityNotFoundException(String message) {
        super(message);
    }

}
