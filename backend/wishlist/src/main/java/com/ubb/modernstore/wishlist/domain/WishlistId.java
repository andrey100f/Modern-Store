package com.ubb.modernstore.wishlist.domain;

import static com.ubb.modernstore.common.domain.ErrorMessages.UTILITY_CLASS;

public class WishlistId {

    public static final String COLLECTION_NAME = "wishlists";
    public static final String PRODUCT_ID = "product_id";
    public static final String USER_ID = "user_id";

    private WishlistId() {
        throw new IllegalStateException(UTILITY_CLASS);
    }

}
