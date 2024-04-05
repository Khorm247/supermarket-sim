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

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    public Product getProductById(String productId) {
        return productRepository.findById(productId).orElseThrow(() -> new NoSuchElementException(String.format("Product with id %s does not exist", productId)));
    }

    public Product addProduct(ProductDto productDto) {
        Product product = Product.builder()
                .name(productDto.name())
                .producer(productDto.producer())
                .productCategory(productDto.productCategory())
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
        Product productToUpdate = getProductById(productId);
        Product updatedProduct = Product.builder()
                .id(productId)
                .name(updatedProductDto.name())
                .producer(updatedProductDto.producer())
                .productCategory(updatedProductDto.productCategory())
                .pricePerBox(updatedProductDto.pricePerBox())
                .fairMarketValue(updatedProductDto.fairMarketValue())
                .yourPrice(productToUpdate.getFairMarketValue())
                .itemsPerBox(updatedProductDto.itemsPerBox())
                .build();
        productRepository.save(updatedProduct);
        return updatedProduct;
    }

    public String deleteProduct(String productId) {
        Product product = getProductById(productId);
        productRepository.delete(product);
        return "Product deleted";
    }
}
