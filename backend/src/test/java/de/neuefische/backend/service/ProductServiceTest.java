package de.neuefische.backend.service;

import de.neuefische.backend.model.Market;
import de.neuefische.backend.model.Product;
import de.neuefische.backend.model.ProductDto;
import de.neuefische.backend.repository.MarketRepository;
import de.neuefische.backend.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceTest {

    private final ProductRepository mockProductRepository = mock(ProductRepository.class);

    private final ProductService productService = new ProductService(mockProductRepository);
    @Test
    void getAllProducts_returnsListOfProducts() {
        // Given
        List<Product> expected = List.of(
                new Product("1", "Product1", "Producer1", new BigDecimal(100), new BigDecimal(100), new BigDecimal("10.50"), 10),
                new Product("2", "Product2", "Producer2", new BigDecimal(100), new BigDecimal(100), new BigDecimal("10.50"), 10),
                new Product("3", "Product3", "Producer3", new BigDecimal(100), new BigDecimal(100), new BigDecimal("10.50"), 10)
        );
        // When
        when(mockProductRepository.findAll()).thenReturn(expected);
        List<Product> actual = productService.getAllProducts();
        // Then
        assertEquals(expected, actual);
        verify(mockProductRepository).findAll();
        verifyNoMoreInteractions(mockProductRepository);
    }

    @Test
    void getAllProducts_whenEmptyDb_thenReturnEmptyList(){
        // Given
        List<Product> expected = List.of();
        // When
        when(mockProductRepository.findAll()).thenReturn(expected);
        List<Product> actual = productService.getAllProducts();
        // Then
        assertEquals(expected, actual);
        verify(mockProductRepository).findAll();
        verifyNoMoreInteractions(mockProductRepository);
    }

    @Test
    void addNewMarket_whenGivenProductDto_ThenReturnNewProduct() {
        // Given
        ProductDto productDto = new ProductDto("Product1", "Producer1", new BigDecimal(100), new BigDecimal("3.50"), 12);
        Product expected = new Product(null, "Product1", "Producer1", new BigDecimal(100), new BigDecimal("3.50"), new BigDecimal("3.50"), 12);
        // When
        when(mockProductRepository.save(any())).thenReturn(expected);
        Product actual = productService.addProduct(productDto);
        // Then
        assertEquals(expected, actual);
        verify(mockProductRepository).save(expected);
        verifyNoMoreInteractions(mockProductRepository);
    }

    @Test
    void updateProduct_whenGivenExistingId_ThenReturnUpdatedProduct() {
        // Given
        String id = "1";
        ProductDto updatedProductDto = new ProductDto("UpdatedProduct", "UpdatedProducer", new BigDecimal(200), new BigDecimal("4.50"), 15);
        Product existingProduct = new Product(id, "Product1", "Producer1", new BigDecimal(100), new BigDecimal("3.50"), new BigDecimal("3.50"), 12);
        Product expectedProduct = new Product(id, "UpdatedProduct", "UpdatedProducer", new BigDecimal(200), new BigDecimal("4.50"), new BigDecimal("3.50"), 15);

        // When
        when(mockProductRepository.findById(id)).thenReturn(Optional.of(existingProduct));
        when(mockProductRepository.save(any())).thenReturn(expectedProduct);
        Product actualProduct = productService.updateProduct(id, updatedProductDto);

        // Then
        assertEquals(expectedProduct, actualProduct);
        verify(mockProductRepository).findById(id);
        verify(mockProductRepository).save(expectedProduct);
        verifyNoMoreInteractions(mockProductRepository);
    }

    @Test
    void deleteProduct_whenGivenWrongId_thenReturnNotFoundMessage() {
        // Given
        String id = "nonExistentId";

        // When
        when(mockProductRepository.existsById(id)).thenReturn(false);
        ResponseEntity<String> response = productService.deleteProduct(id);

        // Then
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Product not found", response.getBody());
        verify(mockProductRepository).existsById(id);
        verifyNoMoreInteractions(mockProductRepository);
    }

    @Test
    void deleteProduct_whenGivenCorrectId_thenDeleteProduct() {
        // Given
        String id = "1";

        // When
        when(mockProductRepository.existsById(id)).thenReturn(true);
        ResponseEntity<String> response = productService.deleteProduct(id);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Product deleted", response.getBody());
        verify(mockProductRepository).existsById(id);
        verify(mockProductRepository).deleteById(id);
        verifyNoMoreInteractions(mockProductRepository);
    }
}