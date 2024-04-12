package de.neuefische.backend.controller;

import de.neuefische.backend.model.Cart;
import de.neuefische.backend.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/cart")
public class CartController {
    private final CartService cartService;

    @GetMapping
    public List<Cart> getAllCarts() {
        return cartService.getAllCarts();
    }

    @GetMapping("/{marketId}")
    public Cart getCartById(@PathVariable String marketId){
        return cartService.getCartByMarketId(marketId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Cart saveNewCart(@RequestBody String marketId){
        return cartService.createNewCart(marketId);
    }

    @PostMapping("/checkout/{marketId}")
    public String checkoutCart(@PathVariable String marketId, @RequestBody Cart cart){
        return cartService.checkoutCart(marketId, cart);
    }

    @PutMapping("/{cartId}")
    public Cart addProductToCart(@PathVariable String cartId, @RequestBody String productId){
        return cartService.addProductToCart(cartId, productId);
    }

    @DeleteMapping("/{cartId}")
    public String deleteCart(@PathVariable String cartId){
        return cartService.deleteCart(cartId);
    }
}
