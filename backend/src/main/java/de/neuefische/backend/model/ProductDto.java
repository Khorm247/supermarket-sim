package de.neuefische.backend.model;

import java.math.BigDecimal;

public record ProductDto(
        String name,
        String producer,
        ProductCategory category,
        BigDecimal pricePerBox,
        BigDecimal fairMarketValue,
        int itemsPerBox
) {
}
