package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;

import java.math.BigDecimal;

@AllArgsConstructor
@RequiredArgsConstructor
@Data
@Builder
public class Product {
    @Id
    private String id;
    private String name;
    private String producer;
    private ProductCategory productCategory;
    private BigDecimal pricePerBox;
    private BigDecimal fairMarketValue;
    private BigDecimal yourPrice;
    private int itemsPerBox;
}
