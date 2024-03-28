package de.neuefische.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.model.Product;
import de.neuefische.backend.model.ProductDto;
import de.neuefische.backend.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class ProductControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ProductRepository productRepository;

    @Test
    void getAllProducts_whenNoProductsExist_thenReturnEmptyList() throws Exception {
        mvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    void getAllProducts_whenProductsInList_thenReturnListProducts() throws Exception {
        // Given
        Product product1 = new Product("1", "Product1", "Producer1", new BigDecimal(100), new BigDecimal("3.50"), new BigDecimal("3.50"), 12);
        Product product2 = new Product("2", "Product2", "Producer2", new BigDecimal(200), new BigDecimal("4.50"), new BigDecimal("4.50"), 24);
        Product product3 = new Product("3", "Product3", "Producer3", new BigDecimal(300), new BigDecimal("5.50"), new BigDecimal("5.50"), 36);

        List<Product> expected = List.of(product1, product2, product3);

        productRepository.saveAll(expected);

        // When
        MvcResult resultJson = mvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andReturn();
        List<Product> result = List.of(objectMapper.readValue(resultJson.getResponse().getContentAsString(), Product[].class));

        // Then
        assertEquals(expected, result);
    }

    @Test
    void getProductById_whenGivenWrongId_thenReturnNotFound() throws Exception {
        // Given
        String id = "nonExistentId";

        // Then
        mvc.perform(get("/api/products/" + id))
            .andExpect(status().isNotFound())
            .andExpect(content().string("Product with id nonExistentId does not exist"));
    }

    @Test
    void getProductById_whenGivenCorrectId_thenReturnProduct() throws Exception {
        // Given
        Product product = new Product("1", "Product1", "Producer1", new BigDecimal(100), new BigDecimal("3.50"), new BigDecimal("3.50"), 12);

        productRepository.save(product);

        // When
        MvcResult resultJson = mvc.perform(get("/api/products/" + product.getId()))
                .andExpect(status().isOk())
                .andReturn();
        Product result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), Product.class);

        // Then
        assertEquals(product, result);
    }

    @Test
    void createProduct_whenGivenProductDto_thenReturnCreatedProduct() throws Exception {
        // Given
        ProductDto productDto = new ProductDto("Product1", "Producer1", new BigDecimal(100), new BigDecimal("3.50"), 12);


        MvcResult productJson = mvc.perform(post("/api/products")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(productDto)))
                .andExpect(status().isCreated())
                .andReturn();

        Product product = objectMapper.readValue(productJson.getResponse().getContentAsString(), Product.class);

        assertNotNull(product.getId());
        assertEquals(productDto.name(), product.getName());
        assertEquals(productDto.producer(), product.getProducer());
        assertEquals(productDto.pricePerBox(), product.getPricePerBox());
        assertEquals(productDto.fairMarketValue(), product.getFairMarketValue());
        assertEquals(productDto.itemsPerBox(), product.getItemsPerBox());
    }

    @Test
    void updateProduct_whenGivenExistingId_ThenReturnUpdatedProduct() throws Exception {
        // Given
        ProductDto productDto = new ProductDto("ProductNew", "ProducerNew", new BigDecimal(100), new BigDecimal("3.50"), 12);
        Product existing = new Product("1", "Product1", "Producer1", new BigDecimal(100), new BigDecimal("3.50"), new BigDecimal("3.50"), 12);

        productRepository.save(existing);

        // When & Then
        MvcResult result = mvc.perform(MockMvcRequestBuilders.put("/api/products/" + existing.getId())
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(productDto)))
                .andExpect(status().isOk())
                .andReturn();

        Product updatedProduct = objectMapper.readValue(result.getResponse().getContentAsString(), Product.class);

        assertEquals(existing.getId(), updatedProduct.getId());
        assertEquals(productDto.name(), updatedProduct.getName());
        assertEquals(productDto.producer(), updatedProduct.getProducer());
        assertEquals(productDto.pricePerBox(), updatedProduct.getPricePerBox());
        assertEquals(productDto.fairMarketValue(), updatedProduct.getFairMarketValue());
        assertEquals(productDto.itemsPerBox(), updatedProduct.getItemsPerBox());
    }

    @Test
    void deleteProduct_whenGivenWrongId_thenReturnNotFoundMessage() throws Exception {
        // Given
        String id = "nonExistentId";

        // Then
        mvc.perform(MockMvcRequestBuilders.delete("/api/products/" + id))
            .andExpect(status().isNotFound())
            .andExpect(content().string("Product with id nonExistentId does not exist"));
    }

    @Test
    void deleteProduct_whenGivenCorrectId_thenDeleteProduct() throws Exception {
        // Given
        Product existing = new Product("1", "Product1", "Producer1", new BigDecimal(100), new BigDecimal("3.50"), new BigDecimal("3.50"), 12);

        productRepository.save(existing);

        // When & Then
        mvc.perform(MockMvcRequestBuilders.delete("/api/products/" + existing.getId()))
                .andExpect(status().isOk())
                .andExpect(content().string("Product deleted"));
    }
}