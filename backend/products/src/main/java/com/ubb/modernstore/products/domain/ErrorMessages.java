package com.ubb.modernstore.products.domain;

public class ErrorMessages {

    public static final String UTILITY_CLASS = "Utility class";
    public static final String ENTITY_NOT_FOUND = "%s(%s) not found";

    private ErrorMessages() {
        throw new IllegalStateException(UTILITY_CLASS);
    }

}
