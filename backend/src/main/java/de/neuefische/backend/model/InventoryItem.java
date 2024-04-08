package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Data
@Builder
public class InventoryItem {
    private String productId;
    private Product product;
    private int quantityInShelf;
    private int quantityInStorage;
}
