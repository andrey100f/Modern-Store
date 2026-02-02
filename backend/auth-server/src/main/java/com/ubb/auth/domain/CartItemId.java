package com.ubb.auth.domain;

import static com.ubb.auth.domain.ErrorMessages.UTILITY_CLASS;

public class CartItemId {

    public static final String PRODUCT = "product";
    public static final String QUANTITY = "quantity";

    private CartItemId() {
        throw new IllegalStateException(UTILITY_CLASS);
    }

}