package com.ubb.modernstore.products.exception;

import java.io.Serial;

import static com.ubb.modernstore.products.domain.ErrorMessages.ENTITY_NOT_FOUND;

public class EntityNotFoundException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = -7575512436433722434L;

    public EntityNotFoundException(String entityName, String entityId) {
        super(ENTITY_NOT_FOUND.formatted(entityName, entityId));
    }

}
