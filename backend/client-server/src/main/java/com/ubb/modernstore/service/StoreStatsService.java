package com.ubb.modernstore.service;

import com.ubb.modernstore.openapi.model.StoreStatsDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StoreStatsService {

    private final UserService userService;
    private final ProductService productService;
    private final OrderService orderService;

    public StoreStatsDto getStoreStats() {
        StoreStatsDto storeStatsDto = new StoreStatsDto();
        storeStatsDto.setTotalUsers(userService.getUserCount());
        storeStatsDto.setTotalProducts(productService.getProductCount());
        storeStatsDto.setTotalOrders(orderService.getOrderCount());

        return storeStatsDto;
    }

}
