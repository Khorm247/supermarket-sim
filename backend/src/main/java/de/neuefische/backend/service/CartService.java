package de.neuefische.backend.service;

import de.neuefische.backend.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final MarketService marketService;
    private final InventoryService inventoryService;

    public List<Cart> getAllCarts() {
        return List.of();
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

    public String checkoutCart(String marketId, Cart cart) {
        Market market = marketService.getMarketById(marketId);
        Inventory inventory = inventoryService.getInventoryByPlayerId(marketId);

        int cartTotalQuantity = cart.getCartItems().stream().mapToInt(CartItem::getQuantity).sum();
        if(market.getCurrentStorage() + cartTotalQuantity > market.getMaximumStorage()){
            return "not enough storage";
        }

        BigDecimal marketBalance = market.getBalance();
        BigDecimal cartTotalPrice = cart.getTotalPrice();

        if (marketBalance == null || cartTotalPrice == null) {
            throw new IllegalArgumentException("marketBalance or cartTotalPrice is null");
        }

        if (marketBalance.compareTo(cartTotalPrice) < 0) {
            return "not enough balance";
        }

        market.setBalance(market.getBalance().subtract(cart.getTotalPrice()));
        market.setCurrentStorage(market.getCurrentStorage() + cartTotalQuantity);
        marketService.updateMarket(market);

        List<InventoryItem> items = inventory.getInventoryItems();
        for (CartItem cartItem : cart.getCartItems()) {
            for (InventoryItem inventoryItem : items) {
                if(cartItem.getProductId().equals(inventoryItem.getProductId())){
                    inventoryItem.setQuantityInStorage(inventoryItem.getQuantityInStorage() + cartItem.getQuantity());
                }
            }
        }
        inventory.setInventoryItems(items);
        inventoryService.updateInventory(inventory);
        // reduce cart (for now this is done in frontend)

        return "checkout processed successfully";
    }

    public String serveCustomer(String marketId, Customer customer) {
        // Update inventory
        Inventory inventory = inventoryService.getInventoryByPlayerId(marketId);
        List<InventoryItem> inventoryItems = inventory.getInventoryItems();

        CartItem boughtProduct = customer.getCartItem();
        List<InventoryItem> updatedInventoryItems = inventoryItems.stream()
                .map(inventoryItem -> {
                    if (inventoryItem.getProductId().equals(boughtProduct.getProductId())) {
                        return InventoryItem.builder()
                                .productId(inventoryItem.getProductId())
                                .product(inventoryItem.getProduct())
                                .quantityInShelf(inventoryItem.getQuantityInShelf())
                                // todo: change from storage to shelf (just for demo)
                                .quantityInStorage(inventoryItem.getQuantityInStorage() - boughtProduct.getQuantity())
                                .build();
                    }
                    return inventoryItem;
                })
                .toList();
        inventory.updateInventoryItems(updatedInventoryItems);
        inventoryService.updateInventory(inventory);

        // Update market balance
        Market market = marketService.getMarketById(marketId);
        market.setBalance(market.getBalance().add(customer.getTotalPrice()));
        market.setCurrentStorage(market.getCurrentStorage() - boughtProduct.getQuantity());
        // todo: change from storage to shelf (just for demo)
        marketService.updateMarket(market);

        return "Customer served";
    }

    public String deleteCart(String cartId) {
        return null;
    }
}
