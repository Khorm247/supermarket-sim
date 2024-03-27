package de.neuefische.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.model.Product;
import de.neuefische.backend.model.ProductDto;
import de.neuefische.backend.service.ProductService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class ProductControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ProductService productService;

    @Test
    void getAllProducts_whenNoProductsExist_thenReturnEmptyList() throws Exception {
        mvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("[]"));
    }

    @Test
    void getAllProducts_whenProductsInList_thenReturnListProducts() throws Exception {
        // Given
        Product product1 = new Product("1", "Product1", "Producer1", new BigDecimal(100), new BigDecimal("3.50"), new BigDecimal("3.50"), 12);
        Product product2 = new Product("2", "Product2", "Producer2", new BigDecimal(200), new BigDecimal("4.50"), new BigDecimal("4.50"), 24);
        Product product3 = new Product("3", "Product3", "Producer3", new BigDecimal(300), new BigDecimal("5.50"), new BigDecimal("5.50"), 36);

        List<Product> expected = List.of(product1, product2, product3);

        when(productService.getAllProducts()).thenReturn(expected);

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
        ResponseEntity<Product> expectedResponse = new ResponseEntity<>(HttpStatus.NOT_FOUND);

        // When
        when(productService.getProductById(id)).thenReturn(expectedResponse);

        // Then
        mvc.perform(get("/api/products/" + id))
            .andExpect(status().isNotFound());
    }

    @Test
    void createProduct_whenGivenProductDto_thenReturnCreatedProduct() throws Exception {
        // Given
        ProductDto productDto = new ProductDto("Product1", "Producer1", new BigDecimal(100), new BigDecimal("3.50"), 12);
        Product expected = new Product("1", "Product1", "Producer1", new BigDecimal(100), new BigDecimal("3.50"), new BigDecimal("3.50"), 12);

        // When & Then
        when(productService.addProduct(productDto)).thenReturn(expected);

        MvcResult productJson = mvc.perform(post("/api/products")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(productDto)))
                .andExpect(status().isCreated())
                .andReturn();

        Product product = objectMapper.readValue(productJson.getResponse().getContentAsString(), Product.class);

        assertEquals(expected, product);
    }

    @Test
    void updateProduct_whenGivenExistingId_ThenReturnUpdatedProduct() throws Exception {
        // Given
        ProductDto productDto = new ProductDto("Product1", "Producer1", new BigDecimal(100), new BigDecimal("3.50"), 12);
        Product expected = new Product("1", "Product1", "Producer1", new BigDecimal(100), new BigDecimal("3.50"), new BigDecimal("3.50"), 12);

        when(productService.addProduct(productDto)).thenReturn(expected);

        MvcResult productJson = mvc.perform(post("/api/products")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(productDto)))
                .andExpect(status().isCreated())
                .andReturn();

        Product product = objectMapper.readValue(productJson.getResponse().getContentAsString(), Product.class);

        ProductDto updatedProductDto = new ProductDto("Product2", "Producer2", new BigDecimal(200), new BigDecimal("4.50"), 24);
        Product updatedProduct = new Product("1", "Product2", "Producer2", new BigDecimal(200), new BigDecimal("4.50"), new BigDecimal("4.50"), 24);

        when(productService.updateProduct(product.getId(), updatedProductDto)).thenReturn(updatedProduct);

        // When & Then
        mvc.perform(MockMvcRequestBuilders.put("/api/products/" + product.getId())
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(updatedProductDto)))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(updatedProduct)));
    }

    @Test
    void deleteProduct_whenGivenWrongId_thenReturnNotFoundMessage() throws Exception {
        // Given
        String id = "nonExistentId";
        ResponseEntity<String> expected = new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);

        // When
        when(productService.deleteProduct(id)).thenReturn(expected);

        // Then
        mvc.perform(MockMvcRequestBuilders.delete("/api/products/" + id))
            .andExpect(status().isNotFound())
            .andExpect(MockMvcResultMatchers.content().string("Product not found"));
    }

    @Test
    void deleteProduct_whenGivenCorrectId_thenDeleteProduct() throws Exception {
        // Given
        ProductDto productDto = new ProductDto("Product1", "Producer1", new BigDecimal(100), new BigDecimal("3.50"), 12);
        Product expected = new Product("1", "Product1", "Producer1", new BigDecimal(100), new BigDecimal("3.50"), new BigDecimal("3.50"), 12);
        when(productService.addProduct(productDto)).thenReturn(expected);

        MvcResult productJson = mvc.perform(post("/api/products")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(productDto)))
                .andExpect(status().isCreated())
                .andReturn();

        Product product = objectMapper.readValue(productJson.getResponse().getContentAsString(), Product.class);

        ResponseEntity<String> expectedResponse = new ResponseEntity<>("Product deleted", HttpStatus.OK);
        when(productService.deleteProduct(product.getId())).thenReturn(expectedResponse);

        // When & Then
        mvc.perform(MockMvcRequestBuilders.delete("/api/products/" + product.getId()))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("Product deleted"));
    }
}