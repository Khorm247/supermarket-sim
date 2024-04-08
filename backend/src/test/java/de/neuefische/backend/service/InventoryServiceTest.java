package de.neuefische.backend.service;

import de.neuefische.backend.model.Inventory;
import de.neuefische.backend.model.Product;
import de.neuefische.backend.model.ProductCategory;
import de.neuefische.backend.repository.InventoryRepository;
import de.neuefische.backend.repository.ProductRepository;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class InventoryServiceTest {

    private final InventoryRepository mockInventoryRepository = mock(InventoryRepository.class);
    private final ProductRepository mockProductRepository = mock(ProductRepository.class);
    private final ProductService productService = new ProductService(mockProductRepository);

    private final InventoryService inventoryService = new InventoryService(mockInventoryRepository, productService);


    @Test
    void getAllInventories_returnsListOfInventories() {
        // Given
        List<Inventory> expected = List.of(
                Inventory.builder()
                        .id("1")
                        .playerId("player1")
                        .build(),
                Inventory.builder()
                        .id("2")
                        .playerId("player2")
                        .build(),
                Inventory.builder()
                        .id("3")
                        .playerId("player3")
                        .build()
        );
        // When
        when(mockInventoryRepository.findAll()).thenReturn(expected);
        List<Inventory> actual = inventoryService.getAllInventories();
        // Then
        assertEquals(expected, actual);
        verify(mockInventoryRepository).findAll();
        verifyNoMoreInteractions(mockInventoryRepository);
    }

    @Test
    void getAllInventories_whenEmptyDb_thenReturnEmptyList(){
        // Given
        List<Inventory> expected = List.of();
        // When
        when(mockInventoryRepository.findAll()).thenReturn(expected);
        List<Inventory> actual = inventoryService.getAllInventories();
        // Then
        assertEquals(expected, actual);
        verify(mockInventoryRepository).findAll();
        verifyNoMoreInteractions(mockInventoryRepository);
    }

    @Test
    void deleteInventory_whenGivenWrongId_thenReturnNotFoundMessage() {
        // Given
        String id = "nonExistentId";

        // When
        when(mockInventoryRepository.findById(id)).thenReturn(Optional.empty());

        // Then
        assertThrows(NoSuchElementException.class, () -> inventoryService.deleteInventory(id));
        verify(mockInventoryRepository).findById(id);
        verifyNoMoreInteractions(mockInventoryRepository);
    }

    @Test
    void deleteInventory_whenGivenCorrectId_thenDeleteInventory() {
        // Given
        String id = "1";
        Inventory inventory = Inventory.builder()
                .id(id)
                .playerId("player1")
                .build();

        // When
        when(mockInventoryRepository.findById(id)).thenReturn(Optional.of(inventory));
        String response = inventoryService.deleteInventory(id);

        // Then
        assertEquals("Inventory deleted", response);
        verify(mockInventoryRepository).findById(id);
        verify(mockInventoryRepository).delete(inventory);
        verifyNoMoreInteractions(mockInventoryRepository);
    }
}