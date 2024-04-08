package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;

@AllArgsConstructor
@Data
@Builder
public class Inventory {
    @Id
    private String id;
    private String playerId;
    private List<InventoryItem> inventoryItems;
}
