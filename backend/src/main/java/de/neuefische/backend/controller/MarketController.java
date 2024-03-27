package de.neuefische.backend.controller;

import de.neuefische.backend.model.Market;
import de.neuefische.backend.service.MarketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/markets")
@RequiredArgsConstructor
public class MarketController {
    private final MarketService marketService;

    @GetMapping
    public List<Market> getAllMarkets() {
        return marketService.getAllMarkets();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Market addNewMarket(@RequestBody String marketName){
        return marketService.addNewMarket(marketName);
    }

    @PutMapping("/{marketId}")
    public Market renameMarket(@PathVariable String marketId, @RequestBody String newMarketName){
        return marketService.renameMarket(marketId, newMarketName);
    }

    @DeleteMapping("/{marketId}")
    public String deleteMarket(@PathVariable String marketId) {
        return marketService.deleteMarket(marketId);
    }
}