package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.math.BigDecimal;

@AllArgsConstructor
@Data
@Builder
public class Customer {
    @Id
    private String id;
    private CartItem cartItem;
    private BigDecimal totalPrice;
}
