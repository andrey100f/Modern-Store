package com.ubb.auth.domain;

import static com.ubb.auth.domain.ErrorMessages.UTILITY_CLASS;

public class UserId {

    public static final String COLLECTION_NAME = "users";
    public static final String USERNAME = "username";
    public static final String EMAIL = "email";
    public static final String PASSWORD = "password";
    public static final String ROLES = "roles";
    public static final String WISHLIST = "wishlist";
    public static final String CART = "cart";

    private UserId() {
        throw new IllegalStateException(UTILITY_CLASS);
    }

}
