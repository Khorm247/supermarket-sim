package de.neuefische.backend.controller;

import de.neuefische.backend.model.Market;
import de.neuefische.backend.service.MarketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/market")
@RequiredArgsConstructor
public class MarketController {
    private final MarketService marketService;

    @GetMapping
    public List<Market> getAllStorageSpaces() {
        return marketService.getAllMarkets();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Market addNewStorageSpace(@RequestBody String marketName){
        return marketService.addNewMarket(marketName);
    }

}