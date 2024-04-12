package de.neuefische.backend.service;

import de.neuefische.backend.model.Cart;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    public List<Cart> getAllCarts() {
        return null;
    }

    public Cart getCartByMarketId(String marketId) {
        return null;
    }

    public Cart createNewCart(String marketId) {
        return null;
    }

    public Cart addProductToCart(String cartId, String productId) {
        return null;
    }

    public String checkoutCart(String marketId) {
        // todo: implement method
        // get market by id

        // get cart by market id
        // check if cart quantity can fit in storage
        // otherwise return error

        // check balance
        // if balance is not enough return error
        // otherwise reduce balance

        // get inventory by market id
        // increase inventory
        // reduce cart (for now this is done in frontend)

        // return success message
        return "checkout processed successfully";
    }


    public String deleteCart(String cartId) {
        return null;
    }
}
