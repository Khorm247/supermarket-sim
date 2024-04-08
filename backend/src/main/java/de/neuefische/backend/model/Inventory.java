package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;

@RequiredArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Inventory {
    @Id
    private String id;
    private String playerId;
    private String productId;
    private int quantity;
}
