package de.neuefische.backend.service;

import de.neuefische.backend.model.Product;
import de.neuefische.backend.model.ProductDto;
import de.neuefische.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public List<Product> listProducts() {
        return productRepository.findAll();
    }

    public Product addProduct(ProductDto productDto) {
        Product product = Product.builder()
                .productId(null)
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

    public Product getProductById(String productId) {
        return productRepository.findById(productId).orElseThrow(() -> new NoSuchElementException("Product with id " + productId + " does not exist"));
    }

    public void deleteProduct(String productId) {
        if (!productRepository.existsById(productId)) {
            throw new NoSuchElementException("Product with id " + productId + " does not exist");
        }
        productRepository.deleteById(productId);
    }
}
