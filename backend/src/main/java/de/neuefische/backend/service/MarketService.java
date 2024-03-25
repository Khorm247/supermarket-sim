package de.neuefische.backend.service;

import de.neuefische.backend.model.Market;
import de.neuefische.backend.repository.MarketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MarketService {
    private final MarketRepository marketRepository;
    private static int marketIdCounter = 0;
    public static synchronized void incrementMarketIdCounter() {
        marketIdCounter++;
    }

    public List<Market> getAllMarkets() {
        return marketRepository.findAll();
    }

    public Market addNewMarket(String marketName) {
        Market market = Market.builder()
                .marketId(String.valueOf(marketIdCounter))
                .name(marketName)
                .balance(new BigDecimal(100))
                .currentShelfSpace(0)
                .maximumShelfSpace(10)
                .currentStorage(0)
                .maximumStorage(50)
                .products(List.of())
                .build();
        incrementMarketIdCounter();
        marketRepository.save(market);
        return market;
    }
}