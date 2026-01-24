package com.ubb.modernstore.mapper;

import com.ubb.modernstore.model.embedded.CartItem;
import com.ubb.modernstore.openapi.model.CartItemDto;
import org.mapstruct.Mapper;

@Mapper
public interface CartItemMapper {

    CartItemDto mapToDto(CartItem cartItem);
    CartItem mapToModel(CartItemDto cartItemDto);

}
