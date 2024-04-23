package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@AllArgsConstructor
@Data
@Builder
public class StoreUpgrade {
    private String upgradeName;
    private int newCapacity;
    private BigDecimal upgradeCost;
}
