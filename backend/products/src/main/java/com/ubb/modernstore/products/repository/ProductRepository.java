package com.ubb.modernstore.products.repository;

import com.ubb.modernstore.products.model.Product;
import com.ubb.modernstore.products.openapi.model.ProductCategoryEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, String> {

    List<Product> findByCategory(ProductCategoryEnum category);

    List<Product> findByIdIn(List<String> ids);

}
