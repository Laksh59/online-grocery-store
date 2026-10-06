package com.grocery.productcatalogservice;

import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;

@SpringBootApplication(scanBasePackages = "com.grocery")
@OpenAPIDefinition(
        info = @Info(
                title = "Online Grocery Store - Product Catalog Microservice REST API Documentation",
                description = "REST APIs for managing grocery inventory including CRUD operations, product catalog management and category management.",
                version = "v1"
        ),
        externalDocs = @ExternalDocumentation(
                description = "Online Grocery Store Product Catalog API Documentation"
        )
)
public class ProductCatalogServiceApplication {

    public static void main(String[] args) {
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Kolkata"));
        SpringApplication.run(ProductCatalogServiceApplication.class, args);
    }
}


