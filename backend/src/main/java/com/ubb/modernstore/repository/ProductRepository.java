package com.ubb.modernstore.repository;

import com.ubb.modernstore.model.Product;
import com.ubb.modernstore.openapi.model.ProductCategoryEnum;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {

    List<Product> findByCategory(ProductCategoryEnum category);

    List<Product> findByIdIn(List<String> ids);

}
