package com.ubb.modernstore.mapper;

import com.ubb.modernstore.model.Wishlist;
import com.ubb.modernstore.openapi.model.WishlistRequestDto;
import org.mapstruct.Mapper;

@Mapper
public interface WishlistMapper {

    Wishlist mapFromRequestDtoToEntity(WishlistRequestDto wishlistRequestDto);

}
