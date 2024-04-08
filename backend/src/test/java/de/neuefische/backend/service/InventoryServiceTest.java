package de.neuefische.backend.service;

import de.neuefische.backend.model.*;
import de.neuefische.backend.repository.InventoryRepository;
import de.neuefische.backend.repository.ProductRepository;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.ArrayList;
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
    void getInventoryById_whenGivenWrongId_thenReturnNotFound() {
        // Given
        String id = "nonExistentId";

        // When
        when(mockInventoryRepository.findById(id)).thenReturn(Optional.empty());

        // Then
        assertThrows(NoSuchElementException.class, () -> inventoryService.getInventoryById(id));
        verify(mockInventoryRepository).findById(id);
        verifyNoMoreInteractions(mockInventoryRepository);
    }

    @Test
    void getInventoryById_whenGivenCorrectId_thenReturnInventory() {
        // Given
        String id = "1";
        Inventory expected = Inventory.builder()
                .id(id)
                .playerId("player1")
                .build();

        // When
        when(mockInventoryRepository.findById(id)).thenReturn(Optional.of(expected));
        Inventory actual = inventoryService.getInventoryById(id);

        // Then
        assertEquals(expected, actual);
        verify(mockInventoryRepository).findById(id);
        verifyNoMoreInteractions(mockInventoryRepository);
    }

    @Test
    void createNewInventory_whenGivenPlayerId_returnNewInventory() {
        // Given
        String playerId = "player1";
        List<Product> products = List.of(
                Product.builder()
                        .id("1")
                        .name("fakeProduct")
                        .producer("fakeProducer")
                        .category(ProductCategory.STARTING_MATERIALS)
                        .pricePerBox(new BigDecimal(100))
                        .fairMarketValue(new BigDecimal(100))
                        .yourPrice(new BigDecimal("10.50"))
                        .build()
        );
        List<Inventory> expected = List.of(
                Inventory.builder()
                        .playerId(playerId)
                        .inventoryItems(products.stream()
                                .map(product -> InventoryItem.builder()
                                        .productId(product.getId())
                                        .product(product)
                                        .quantityInShelf(0)
                                        .quantityInStorage(0)
                                        .build())
                                .toList())
                        .build()
        );

        // When
        when(mockProductRepository.findAll()).thenReturn(products);
        when(mockInventoryRepository.save(any())).thenReturn(expected.getFirst());

        Inventory actual = inventoryService.createNewInventory(playerId);
        // Then
        assertEquals(expected.getFirst(), actual);
        verify(mockProductRepository).findAll();
        verify(mockInventoryRepository).save(any());
        verifyNoMoreInteractions(mockProductRepository);
        verifyNoMoreInteractions(mockInventoryRepository);
    }

    @Test
    void addProductCategory_whenGivenInventoryIdAndCategory_thenReturnUpdatedInventory() {
        // Given
        String inventoryId = "1";
        String category = "FRUITS";
        Inventory inventory = Inventory.builder()
                .id(inventoryId)
                .playerId("player1")
                .inventoryItems(new ArrayList<>())
                .build();
        List<Product> products = List.of(
                Product.builder()
                        .id("1")
                        .name("fakeProduct")
                        .producer("fakeProducer")
                        .category(ProductCategory.FRUITS)
                        .pricePerBox(new BigDecimal(100))
                        .fairMarketValue(new BigDecimal(100))
                        .yourPrice(new BigDecimal("10.50"))
                        .build(),
                Product.builder()
                        .id("2")
                        .name("fakeProduct2")
                        .producer("fakeProducer2")
                        .category(ProductCategory.FRUITS)
                        .pricePerBox(new BigDecimal(55))
                        .fairMarketValue(new BigDecimal(55))
                        .yourPrice(new BigDecimal("3.50"))
                        .build()
        );
        Inventory expected = Inventory.builder()
                .id(inventoryId)
                .playerId("player1")
                .inventoryItems(products.stream()
                        .map(product -> InventoryItem.builder()
                                .productId(product.getId())
                                .product(product)
                                .quantityInShelf(0)
                                .quantityInStorage(0)
                                .build())
                        .toList())
                .build();

        // When
        when(mockInventoryRepository.findById(inventoryId)).thenReturn(Optional.of(inventory));
        when(mockProductRepository.findAll()).thenReturn(products);
        when(mockInventoryRepository.save(any())).thenReturn(expected);

        Inventory actual = inventoryService.addProductCategory(inventoryId, category);
        // Then
        assertEquals(expected, actual);
        verify(mockInventoryRepository).findById(inventoryId);
        verify(mockProductRepository).findAll();
        verify(mockInventoryRepository).save(any());
        verifyNoMoreInteractions(mockInventoryRepository);
        verifyNoMoreInteractions(mockProductRepository);
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