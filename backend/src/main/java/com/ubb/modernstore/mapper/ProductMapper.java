package com.ubb.modernstore.mapper;

import com.ubb.modernstore.model.Product;
import com.ubb.modernstore.openapi.model.ProductDto;
import org.mapstruct.Mapper;

@Mapper
public interface ProductMapper {

    ProductDto mapToDto(Product product);
    Product mapToModel(ProductDto productDto);

}
