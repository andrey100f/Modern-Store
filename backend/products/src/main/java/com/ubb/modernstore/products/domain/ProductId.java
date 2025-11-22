package com.ubb.modernstore.products.domain;

import static com.ubb.modernstore.common.domain.ErrorMessages.UTILITY_CLASS;

public class ProductId {

    public static final String COLLECTION_NAME = "products";
    public static final String NAME = "name";
    public static final String DESCRIPTION = "description";
    public static final String PRICE = "price";
    public static final String IMAGE_URL = "image_url";
    public static final String RATING = "rating";
    public static final String REVIEW_COUNT = "review_count";
    public static final String IN_STOCK = "in_stock";
    public static final String CATEGORY = "category";

    private ProductId() {
        throw new IllegalStateException(UTILITY_CLASS);
    }
}
