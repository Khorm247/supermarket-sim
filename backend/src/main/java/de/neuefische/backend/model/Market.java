package de.neuefische.backend.model;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@RequiredArgsConstructor
@Data
@Builder
public class Market {
    private String marketId;
    private String name;
    private BigDecimal balance;
    private int maximumStorage;
    private int currentStorage;
    private int maximumShelfSpace;
    private int currentShelfSpace;
    private List<Product> products;
}
