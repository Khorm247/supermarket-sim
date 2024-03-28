package de.neuefische.backend.controller;

import de.neuefische.backend.model.Product;
import de.neuefische.backend.model.ProductDto;
import de.neuefische.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{productId}")
    public Product getProductById(@PathVariable String productId){
        return productService.getProductById(productId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Product addNewMarket(@RequestBody ProductDto newProduct){
        return productService.addProduct(newProduct);
    }

    @PutMapping("/{productId}")
    public Product updateProduct(@PathVariable String productId, @RequestBody ProductDto updatedProduct){
        return productService.updateProduct(productId, updatedProduct);
    }

    @DeleteMapping("/{productId}")
    public String deleteMarket(@PathVariable String productId){
        return productService.deleteProduct(productId);
    }

    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleNoSuchElementException(NoSuchElementException e){
        return e.getMessage();
    }
}
