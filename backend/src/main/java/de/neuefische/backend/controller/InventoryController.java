package de.neuefische.backend.controller;

import de.neuefische.backend.model.Inventory;
import de.neuefische.backend.model.StoreUpgrade;
import de.neuefische.backend.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/inventory")
public class InventoryController {
    private final InventoryService inventoryService;

    @GetMapping
    public List<Inventory> getAllInventories() {
        return inventoryService.getAllInventories();
    }

    @GetMapping("/{inventoryId}")
    public Inventory getInventoryById(@PathVariable String inventoryId){
        return inventoryService.getInventoryById(inventoryId);
    }

    @GetMapping("/player/{playerId}")
    public Inventory getInventoryByPlayerId(@PathVariable String playerId){
        return inventoryService.getInventoryByPlayerId(playerId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Inventory createNewInventory(@RequestBody String playerId){
        return inventoryService.createNewInventory(playerId);
    }

    @PutMapping("/{inventoryId}")
    public Inventory addProductCategory(@PathVariable String inventoryId, @RequestBody StoreUpgrade storeUpgrade){
        return inventoryService.addProductCategory(inventoryId, storeUpgrade);
    }

    @DeleteMapping("/{inventoryId}")
    public String deleteMarket(@PathVariable String inventoryId){
        return inventoryService.deleteInventory(inventoryId);
    }

    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleNoSuchElementException(NoSuchElementException e){
        return e.getMessage();
    }
}
