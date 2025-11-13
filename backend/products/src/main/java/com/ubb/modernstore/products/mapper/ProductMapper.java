package com.ubb.modernstore.products.mapper;

import com.ubb.modernstore.products.model.Product;
import com.ubb.modernstore.products.openapi.model.ProductDto;
import org.mapstruct.Mapper;

@Mapper
public interface ProductMapper {

    ProductDto mapToDto(Product product);

}
