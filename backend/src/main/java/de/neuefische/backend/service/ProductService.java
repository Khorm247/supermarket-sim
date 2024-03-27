package de.neuefische.backend.service;

import de.neuefische.backend.model.Product;
import de.neuefische.backend.model.ProductDto;
import de.neuefische.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private static final String NO_PRODUCT_FOUND = "Product with id %s does not exist";

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    public ResponseEntity<Product> getProductById(String productId) {
        Optional<Product> productOptional = productRepository.findById(productId);
        return productOptional.map(product -> new ResponseEntity<>(product, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    public Product addProduct(ProductDto productDto) {
        Product product = Product.builder()
                .name(productDto.name())
                .producer(productDto.producer())
                .pricePerBox(productDto.pricePerBox())
                .fairMarketValue(productDto.fairMarketValue())
                .yourPrice(productDto.fairMarketValue())
                .itemsPerBox(productDto.itemsPerBox())
                .build(
        );
        productRepository.save(product);
        return product;
    }

    public Product updateProduct(String productId, ProductDto updatedProductDto) {
        Product productToUpdate = productRepository.findById(productId).orElseThrow(() -> new NoSuchElementException(String.format(NO_PRODUCT_FOUND, productId)));
        Product updatedProduct = Product.builder()
                .id(productId)
                .name(updatedProductDto.name())
                .producer(updatedProductDto.producer())
                .pricePerBox(updatedProductDto.pricePerBox())
                .fairMarketValue(updatedProductDto.fairMarketValue())
                .yourPrice(productToUpdate.getFairMarketValue())
                .itemsPerBox(updatedProductDto.itemsPerBox())
                .build();
        productRepository.save(updatedProduct);
        return updatedProduct;
    }

    public ResponseEntity<String> deleteProduct(String productId) {
        if (!productRepository.existsById(productId)) {
            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
        }

        productRepository.deleteById(productId);
        return new ResponseEntity<>("Product deleted", HttpStatus.OK);
    }
}
