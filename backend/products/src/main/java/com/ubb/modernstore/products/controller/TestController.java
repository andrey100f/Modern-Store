package com.ubb.modernstore.products.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ubb.modernstore.products.openapi.controller.TestApi;

@RestController
@RequestMapping("/api")
public class TestController implements TestApi {

    @Override
    public ResponseEntity<String> testEndpoint() {
        return ResponseEntity.ok("Hello World");
    }

}
