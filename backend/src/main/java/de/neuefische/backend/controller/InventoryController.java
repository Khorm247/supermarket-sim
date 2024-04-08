package de.neuefische.backend.controller;

import de.neuefische.backend.model.Inventory;
import de.neuefische.backend.model.Product;
import de.neuefische.backend.model.ProductDto;
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

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Inventory createNewInventory(@RequestBody String playerId){
        return inventoryService.createNewInventory(playerId);
    }

    @PutMapping
    public Inventory addProductCategory(@RequestBody String inventoryId, @RequestBody String categoryToAdd){
        return inventoryService.addProductCategory(inventoryId, categoryToAdd);
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
