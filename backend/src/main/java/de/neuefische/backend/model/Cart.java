package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@Data
@Builder
public class Cart {
    @Id
    private String id;
    private String playerId;
    private List<CartItem> cartItems;
    private BigDecimal totalPrice;
}
