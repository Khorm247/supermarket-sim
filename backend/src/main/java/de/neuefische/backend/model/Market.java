package de.neuefische.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class Market {
    @Id
    private String id;
    private String name;
    private BigDecimal balance;
    private int maximumStorage;
    private int currentStorage;
    private int maximumShelfSpace;
    private int currentShelfSpace;
    private List<Product> products;

}
