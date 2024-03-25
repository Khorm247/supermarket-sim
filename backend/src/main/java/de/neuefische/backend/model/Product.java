package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
@RequiredArgsConstructor
@Data
public class Product {
    private String name;
    private String producer;
    private BigDecimal pricePerBox;
    private BigDecimal fairMarketValue;
    private BigDecimal yourPrice;
    private String boxSize;
    private int boxSizeInUnits;
    private int itemsPerBox;
}
