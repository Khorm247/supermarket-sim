package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@RequiredArgsConstructor
@Data
public class Market {
    private String name;
    private BigDecimal balance;
    private int maximumStorage;
    private int currentStorage;
    private int maximumShelfSpace;
    private int currentShelfSpace;
    private List<Product> products;

}
