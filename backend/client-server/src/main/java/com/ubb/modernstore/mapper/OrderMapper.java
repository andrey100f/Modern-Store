package com.ubb.modernstore.mapper;

import com.ubb.modernstore.model.Order;
import com.ubb.modernstore.openapi.model.OrderRequestDto;
import org.mapstruct.Mapper;

@Mapper
public interface OrderMapper {

    Order mapFromRequestDtoToModel(OrderRequestDto requestDto);

}
