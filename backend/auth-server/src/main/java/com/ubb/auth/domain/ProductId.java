package com.ubb.auth.domain;

import static com.ubb.auth.domain.ErrorMessages.UTILITY_CLASS;

public class ProductId {

    public static final String COLLECTION_NAME = "products";
    public static final String NAME = "name";
    public static final String DESCRIPTION = "description";
    public static final String PRICE = "price";
    public static final String IMAGE_URL = "imageUrl";
    public static final String RATING = "rating";
    public static final String REVIEW_COUNT = "reviewCount";
    public static final String IN_STOCK = "inStock";
    public static final String CATEGORY = "category";

    private ProductId() {
        throw new IllegalStateException(UTILITY_CLASS);
    }

}
