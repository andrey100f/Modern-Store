package com.ubb.modernstore.wishlist.mapper;

import com.ubb.modernstore.wishlist.entity.Wishlist;
import com.ubb.modernstore.wishlist.openapi.model.WishlistRequestDto;
import org.mapstruct.Mapper;

@Mapper
public interface WishlistMapper {

    Wishlist mapFromRequestDtoToEntity(WishlistRequestDto wishlistRequestDto);

}
