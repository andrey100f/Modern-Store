package com.ubb.modernstore.model;

import com.ubb.modernstore.domain.ProductId;
import com.ubb.modernstore.openapi.model.ProductCategoryEnum;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = ProductId.COLLECTION_NAME)
@Data
public class Product {

    @Id
    private String id;

    @Field(name = ProductId.NAME)
    private String name;

    @Field(name = ProductId.DESCRIPTION)
    private String description;

    @Field(name = ProductId.PRICE)
    private Double price;

    @Field(name = ProductId.IMAGE_URL)
    private String imageUrl;

    @Field(name = ProductId.RATING)
    private Double rating;

    @Field(name = ProductId.REVIEW_COUNT)
    private Integer reviewCount;

    @Field(name = ProductId.IN_STOCK)
    private Boolean inStock;

    @Field(name = ProductId.CATEGORY)
    private ProductCategoryEnum category;

}
