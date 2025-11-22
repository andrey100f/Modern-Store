package com.ubb.modernstore.products.model;

import com.ubb.modernstore.products.domain.ProductId;
import com.ubb.modernstore.products.openapi.model.ProductCategoryEnum;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Table(name = ProductId.COLLECTION_NAME)
@Entity
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = ProductId.NAME)
    private String name;

    @Column(name = ProductId.DESCRIPTION)
    private String description;

    @Column(name = ProductId.PRICE)
    private Double price;

    @Column(name = ProductId.IMAGE_URL)
    private String imageUrl;

    @Column(name = ProductId.RATING)
    private Double rating;

    @Column(name = ProductId.REVIEW_COUNT)
    private Integer reviewCount;

    @Column(name = ProductId.IN_STOCK)
    private Boolean inStock;

    @Column(name = ProductId.CATEGORY)
    @Enumerated(value = EnumType.STRING)
    private ProductCategoryEnum category;

}
