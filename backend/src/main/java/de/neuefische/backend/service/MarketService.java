package de.neuefische.backend.service;

import de.neuefische.backend.model.Market;
import de.neuefische.backend.model.StoreUpgrade;
import de.neuefische.backend.repository.MarketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class MarketService {
    private final MarketRepository marketRepository;

    public List<Market> getAllMarkets() {
        return marketRepository.findAll();
    }

    public Market getMarketById(String marketId) {
        return marketRepository.findById(marketId).orElseThrow();
    }

    public Market addNewMarket(String marketName) {
        Market market = Market.builder()
                .name(marketName)
                .balance(new BigDecimal(100))
                .currentShelfSpace(0)
                .maximumShelfSpace(10)
                .currentStorage(0)
                .maximumStorage(50)
                .products(List.of())
                .build();
        marketRepository.save(market);
        return market;
    }

    public Market renameMarket(String marketId, String newMarketName) {
        List<Market> markets = marketRepository.findAll();
        Market marketToUpdate = markets.stream().filter(market -> Objects.equals(market.getId(), marketId)).findFirst().orElseThrow();
        Market updatedMarket = Market.builder()
                .id(marketId)
                .name(newMarketName)
                .balance(marketToUpdate.getBalance())
                .currentShelfSpace(marketToUpdate.getCurrentShelfSpace())
                .maximumShelfSpace(marketToUpdate.getMaximumShelfSpace())
                .currentStorage(marketToUpdate.getCurrentStorage())
                .maximumStorage(marketToUpdate.getMaximumStorage())
                .products(marketToUpdate.getProducts())
                .build();
        marketRepository.save(updatedMarket);
        return updatedMarket;
    }

    public void updateMarket(Market market) {
        marketRepository.save(market);
    }

    public ResponseEntity<String> deleteMarket(String marketId) {
        if (!marketRepository.existsById(marketId)) {
            return new ResponseEntity<>("Market not found", HttpStatus.NOT_FOUND);
        }

        marketRepository.deleteById(marketId);
        return new ResponseEntity<>("Market deleted", HttpStatus.OK);
    }

    public String upgradeStore(String marketId, StoreUpgrade storeUpgrade) {
        Market market = getMarketById(marketId);
        if (market.getBalance().compareTo(storeUpgrade.getUpgradeCost()) < 0) {
            return "Not enough money";
        }

        Market updatedMarket = Market.builder()
                .id(marketId)
                .name(market.getName())
                .balance(market.getBalance().subtract(storeUpgrade.getUpgradeCost()))
                .currentShelfSpace(market.getCurrentShelfSpace())
                .maximumShelfSpace(market.getMaximumShelfSpace())
                .currentStorage(market.getCurrentStorage())
                .maximumStorage(market.getMaximumStorage())
                .products(market.getProducts())
                .build();

        // check which upgrade is being made and update the market accordingly
        updatedMarket.setMaximumStorage(updatedMarket.getMaximumStorage() + storeUpgrade.getNewCapacity());

        marketRepository.save(updatedMarket);
        return "Store upgraded";
    }
}