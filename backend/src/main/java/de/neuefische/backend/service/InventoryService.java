package de.neuefische.backend.service;

import de.neuefische.backend.model.*;
import de.neuefische.backend.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.yaml.snakeyaml.error.Mark;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepository;
    private final ProductService productService;
    private final MarketService marketService;

    public List<Inventory> getAllInventories() {
        return inventoryRepository.findAll();
    }

    public Inventory getInventoryById(String inventoryId) {
        return inventoryRepository.findById(inventoryId).orElseThrow(() -> new NoSuchElementException(String.format("Inventory with id %s does not exist", inventoryId)));
    }

    public Inventory getInventoryByPlayerId(String playerId) {
        return inventoryRepository.findAll().stream()
                .filter(inventory -> inventory.getPlayerId().equals(playerId))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException(String.format("Inventory with player id %s does not exist", playerId)));
    }

    public Inventory createNewInventory(String playerId) {
        List<Product> products = productService.getAllProducts().stream()
                .filter(product -> product.getCategory().equals(ProductCategory.STARTING_MATERIALS))
                .toList();

        List<InventoryItem> inventoryItems = products.stream()
                .map(product -> InventoryItem.builder()
                        .productId(product.getId())
                        .product(product)
                        .quantityInShelf(0)
                        .quantityInStorage(0)
                        .build())
                .toList();

        Inventory newInventory = Inventory.builder()
                .playerId(playerId)
                .inventoryItems(inventoryItems)
                .build();

        inventoryRepository.save(newInventory);
        return newInventory;
    }

    public Inventory updateInventory(Inventory updatedInventory) {
        inventoryRepository.save(updatedInventory);
        return updatedInventory;
    }

    public Inventory addProductCategory(String inventoryId, StoreUpgrade storeUpgrade) {
        Inventory inventory = getInventoryById(inventoryId);
        ProductCategory categoryToAdd = ProductCategory.valueOf(storeUpgrade.getUpgradeName());

        List<Product> products = productService.getAllProducts().stream()
                .filter(product -> product.getCategory().equals(categoryToAdd))
                .toList();

        List<InventoryItem> oldInventoryItems = inventory.getInventoryItems();

        for (Product product : products) {
            if (oldInventoryItems.stream().noneMatch(inventoryItem -> inventoryItem.getProductId().equals(product.getId()))) {
                oldInventoryItems.add(InventoryItem.builder()
                        .productId(product.getId())
                        .product(product)
                        .quantityInShelf(0)
                        .quantityInStorage(0)
                        .build());
            }
        }
        inventory.setInventoryItems(oldInventoryItems);

        Market market = marketService.getMarketById(inventory.getPlayerId());
        market.setBalance(market.getBalance().subtract(storeUpgrade.getUpgradeCost()));
        marketService.updateMarket(market);

        return updateInventory(inventory);
    }

    public String deleteInventory(String inventoryId) {
        Inventory inventory = getInventoryById(inventoryId);
        inventoryRepository.delete(inventory);
        return "Inventory deleted";
    }
}
